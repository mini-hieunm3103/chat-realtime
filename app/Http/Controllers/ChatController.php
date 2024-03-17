<?php

namespace App\Http\Controllers;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Resources\UsersChannelResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\Channel;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class ChatController extends Controller
{
    public function chatting(Request $request, $base10):Response
    {
        /*
         - base10 sẽ convert về base 37
            + nếu có dạng: gr-{id} thì là group chat
            + nếu có dạng: dm-{id} thì là direct-message: nhắn tin riêng
         * */
        $decode = convertBasePhp($base10, 10, 37);
        $explode = explode('-', $decode);
        if (count($explode) !== 2) {
            abort(404);
        }
        $type = $explode[0];
        $id = $explode[1];
        if ($type == 'gr') {
            $group = Group::find($id);
            if (!$group){
                abort(404);
            }
            $channelId = Group::find($id)->channel_id;
        } else if ($type == 'dm'){
            $channelId = $this->findOrNewChannel(getAuthUser()->id, $id)->id;
        } else {
            abort(404);
        }
        return Inertia::render('Chatting/Chat', [
            'auth' => getAuthUser(),
            'isGroup' => ($type == 'gr'),
            'channelId'=> $channelId,
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function getMessages($channelId)
    {
        $messages = Message::where('channel_id', $channelId)->orderBy('created_at', 'asc')->with('user.detail')->paginate(15);
        return MessageResource::collection($messages);
    }
    public function directMessage(Request $request)
    {
//        dd($request);
    }
    // channel inbox
    public function findOrNewChannel($sender, $receiver) {
        $channel = Channel::where('type', 'dm')->whereHas('users', function($q) use ($sender) {
            $q->where('user_id',$sender);
        })->whereHas('users', function($q) use ($receiver) {
            $q->where('user_id',$receiver);
        })->first();
        if (empty($channel)){
            $channel = Channel::create([
                'name' => $sender.'_'.$receiver, // k phu thuoc vao ten channel. Dat ten gi cung duoc
                'type' => 'dm'
            ]);
            $channel->users()->attach($sender);
            $channel->users()->attach($receiver);
            return $channel;
        }
        return $channel;
    }
    public function getUsersChannel($channelId)
    {
        $usersChannel = Channel::with(['users' => function ($q) {
            $q->with('detail');
        }])->where('id', $channelId)->first();
        return new UsersChannelResource($usersChannel);
    }
    public function dialog()
    {
        // hiện tất cả group
        // chỉ hiện với những user đã nhắn tin
        // sắp xếp theo thời gian tin nhắn gần nhất
        $authUser = Auth::user();
        $channelsWithMessage = $authUser->channels()
            ->with([
                'messages' => function ($q) {
                    $q->with('user.detail')->latest();
                },
                'group',
                'users' => function ($query) use ($authUser) {
                    $query->with('detail')->where('users.id', '<>', $authUser->id);
                }
            ])
            ->WhereHas('messages')
            ->joinSub(
                Message::select('channel_id', DB::raw('MAX(created_at) as last_message_at'))
                    ->groupBy('channel_id'),
                'latest_messages',
                'latest_messages.channel_id', '=', 'channels.id'
            )
            // Sắp xếp channels dựa trên thời gian tin nhắn mới nhất
            ->orderBy('last_message_at', 'desc')
            ->get();
        $newGroup = $authUser
            ->channels()
            ->with([
                'messages' => function ($q) {
                    $q->with('user.detail')->latest();
                },
                'group',
                'users' => function ($query) use ($authUser) {
                    $query->with('detail')->where('users.id', '<>', $authUser->id);
                }
            ])
            ->where('channels.type', 'group')
            ->whereDoesntHave('messages')
            ->get();
        $mergedResults = $newGroup->merge($channelsWithMessage);
        $perPage = 10;
        $page = LengthAwarePaginator::resolveCurrentPage() ?: 1;
        $itemsForCurrentPage = $mergedResults->slice(($page - 1) * $perPage, $perPage)->all();
        $merge = new LengthAwarePaginator($itemsForCurrentPage, $mergedResults->count(), $perPage, $page, [
            'path' => LengthAwarePaginator::resolveCurrentPath(),
        ]);
        foreach ($merge as $channel) {
            if (!empty($channel->group) && $channel->type === "group") {
                $channel->detail = $channel->group;
            }
            if ($channel->users->count() === 1 && $channel->type === "dm") {
                $channel->detail = new UserResource($channel->users[0]);
            }
            $channel->lastestMessage =(isset($channel->messages[0])) ? new MessageResource($channel->messages->first()) :null;
            $channel->unsetRelation('group');
            $channel->unsetRelation('users');
            $channel->unsetRelation('messages');
            $channel->unsetRelation('pivot');
        }
// Return the paginated merged results
        return $merge;
    }
}

