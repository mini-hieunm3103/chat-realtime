<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessagePosted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $message;
    public $channelId;
    /**
     * Create a new event instance.
     */
    public function __construct($user, $message, $channelId)
    {
        $this->user = $user;
        $this->message = $message;
        $this->channelId = $channelId;
    }
    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
//        if($this->channelType == "dm") {
//            return new PrivateChannel("chat.dm.".$this->channelId);
//        }else if ($this->channelType == "group") {
//            return new PrivateChannel("chat.group.".$this->channelId);
//        }
        return new PrivateChannel("chat.".$this->channelId);
    }
}
