<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Resources\UserResource;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
Broadcast::channel('chat', function ($user){
    return $user->id;
});
Broadcast::channel('chat.{channel_id}', function ($user, $channel_id) {
    return User::where('id', $user->id)->whereHas('channels', function ($q) use ($channel_id) {
        $q->where('channel_id', $channel_id);
    })->first();
});
