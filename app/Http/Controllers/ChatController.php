<?php

namespace App\Http\Controllers;

use App\Http\Resources\UsersChannelResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\Channel;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
        $type = $explode[0];
        $id = $explode[1];
        $channelId = 0;
        if ($type == 'gr') {
            dd($id);
        } else if ($type == 'dm'){
            $channelId = $this->findOrNewChannel(getAuthUser()->id, $id)->id;
        } else {
            abort(404);
        }
        return Inertia::render('Chatting/Chat', [
            'auth' => getAuthUser(),
            'isGroup' => ($type == 'gr'),
            'channelId'=> $channelId,
            'usersChannel' => $this->getUsersChannel($channelId)
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
}
