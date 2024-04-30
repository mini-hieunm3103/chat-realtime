<?php

namespace App\Http\Controllers;

use App\Http\Resources\FileResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\Storage\LinkResource;
use App\Http\Resources\Storage\MediaResource;
use App\Http\Resources\UsersChannelResource;
use App\Models\Channel;
use App\Models\File;
use App\Models\Link;
use App\Models\Message;

class ChannelController extends Controller
{
    public function channelMedia($channelId) {
        $messagesMedia =
            Message::where([['channel_id', '=', $channelId], ['is_recalled', '=', 0],])
            ->where(function ($q) {
                return $q->where('type', 'image')->orWhere('type', 'video');
            })
            ->orderBy('created_at', 'desc')->paginate(15);
        return MediaResource::collection($messagesMedia);
    }
    public function channelLinks($channelId) {
        $links = Link::whereHas('message', function ($query) use ($channelId) {
            $query->where('channel_id', $channelId);
        })->orderBy('created_at', 'desc')->paginate(15);
        return LinkResource::collection($links);
    }
    public function channelDocuments($channelId)
    {
        $files = File::whereHas('message', function ($query) use ($channelId) {
            $query->where('channel_id', $channelId);
            $query->where('type', 'document');
        })->orderBy('created_at', 'desc')->paginate(15);
        return FileResource::collection($files);
    }
    public function channelMessages($channelId)
    {
        $messages = Message::where('channel_id', $channelId)->orderBy('created_at', 'desc')->with(['user.userDetail', 'file'])->paginate(25);
        return MessageResource::collection($messages);
    }
    public function channelUsers($channelId)
    {
    // phải render ra hết không phân trang do có chức năng thêm user trong group => phải lấy ra hết users
        $usersChannel = Channel::with(['users' => function ($q) {
            $q->orderBy('name', 'asc')->with('userDetail');
        }])->where('id', $channelId)->first();
        return new UsersChannelResource($usersChannel);
    }
}
