<?php

namespace App\Http\Controllers;

use App\Events\MessagePosted;
use App\Events\MessageRecalled;
use App\Http\Resources\GroupResource;
use App\Models\File;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Http\Resources\UsersChannelResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\Channel;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;
use JetBrains\PhpStorm\NoReturn;

class ChatController extends Controller
{
    public function chatting(Request $request, $base10):Response
    {
        /*
         - base10 sẽ convert về base 37
            + nếu có dạng: gr-{id} thì là group chat (id: groupId)  1W
            + nếu có dạng: dm-{id} thì là direct-message: nhắn tin riêng (id: userId who you want to chat with)
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
            $channelId = $this->findOrNewChannel(getAuthUserResource()->id, $id)->id;
        } else {
            abort(404);
        }
        return Inertia::render('Chatting/Chat', [
            'auth' => getAuthUserResource(),
            'isGroup' => ($type == 'gr'),
            'channelId'=> $channelId,
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function getMessages($channelId)
    {
        $messages = Message::where('channel_id', $channelId)->orderBy('created_at', 'desc')->with(['user.userDetail', 'file'])->paginate(25);
        return MessageResource::collection($messages);
    }
    public function postMessage(Request $request)
    {
        $message = new Message();
        $message->type = $request->message_type;
        if ($request->message_type === "text") {
            $message->message_text = $request->message_text;
            $message->message_file_id = null;
        } else {
            $message->message_text = null;

            $messageFile = $request->file('message_file');
            $messageFileOriginalName = $messageFile->getClientOriginalName();
            $messageFileNameInStorage = time() . '_' . $messageFileOriginalName;
            Storage::disk('public')->putFileAs($request->message_type.'s/', $messageFile, $messageFileNameInStorage);

            $file = new File();
            $file->name = $messageFileOriginalName;
            $file->path ='/'.$request->message_type.'s/'.$messageFileNameInStorage;
            $file->size = $messageFile->getSize();
            $file->save();

            $message->message_file_id = $file->id;
        }
        $message->channel_id = $request->channel_id;
        $message->is_recalled = 0;
        $message->user_id = Auth::id();
        $message->save();
        $message = new MessageResource($message->load('user.userDetail', 'file'));
        $user = Auth::user();
        broadcast(new MessagePosted($user, $message, $request->channel_id));
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

    public function dialog(Request $request)
    {
        // hiện tất cả group
        // chỉ hiện với những user đã nhắn tin
        // sắp xếp theo thời gian tin nhắn gần nhất
        $keyword=null;
        if ($request->keyword){
            $keyword = $request->keyword;
        }
//        dd($keyword);
        $authUser = Auth::user();
        $channelsWithMessage = $authUser->channels()
            ->with([
                'messages' => function ($q) {
                    $q->with('user.userDetail')->latest();
                },
                'group',
                'users' => function ($query) use ($authUser) {
                    $query->with('userDetail')->where('users.id', '<>', $authUser->id);
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
                    $q->with('sender.userDetail')->latest();
                },
                'group',
                'users' => function ($query) use ($authUser) {
                    $query->with('userDetail')->where('users.id', '<>', $authUser->id);
                }
            ])
            ->where('channels.type', 'group')
            ->whereDoesntHave('messages')
            ->orderBy('created_at', 'desc')
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
                $channel->detail = new GroupResource($channel->group);
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
        return ($merge);
    }
    public function recallMessage(Request $request)
    {
        $message = Message::find($request->message_id);
        if ($message->user_id !== Auth::id()){
            abort(403);
        };
        $message->is_recalled = 1;
        $message->save();
        $user = Auth::user();
        broadcast(new MessageRecalled($user, $message->id, $request->channel_id))->toOthers();
    }
}

