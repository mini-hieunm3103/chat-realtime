<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Channel;
use App\Models\Group;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RouteController extends Controller
{
    public function welcome()
    {
        return Inertia::render('Welcome', [
            'auth' => getAuthUserResource()
        ]);
    }

    public function settings(Request $request): Response
    {
        return Inertia::render('Setting/Edit', [
            'auth' => getAuthUserResource(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
    public function chatting (Request $request, $base10):Response
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
}
