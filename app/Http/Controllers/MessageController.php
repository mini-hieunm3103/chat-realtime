<?php

namespace App\Http\Controllers;

use App\Events\MessagePosted;
use App\Events\MessageRecalled;
use App\Http\Resources\GroupResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\UserResource;
use App\Models\File;
use App\Models\Link;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MessageController extends Controller
{
    public function recall(Request $request)
    {
        $message = Message::find($request->message_id);
        if ($message->user_id !== Auth::id()){
            abort(403);
        };
        //reset message info
        if ($message->message_file_id) {
            $messageFile = $message->file;
            Storage::disk('public')->delete($messageFile->path);
            $messageFile->delete();
        }
        if (count($message->links)) {
            foreach ($message->links as $link) {
                $link->delete();
            }
        }
        $message->message_text = null;
        $message->is_recalled = 1;
        $message->save();
        $user = Auth::user();
        broadcast(new MessageRecalled($user, $message->id, $request->channel_id))->toOthers();
    }
    public function post (Request $request)
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
        if ($request->has('links') && count($request->links)>0) {
            foreach ($request->links as $messageLink) {
                $link = new Link();
                $link->text=$messageLink['text'];
                $link->url = $messageLink['url'];
                $link->message_id = $message->id;
                $link->save();
            }
        }
        $message = new MessageResource($message->load('user.userDetail', 'file'));
        $user = Auth::user();
        broadcast(new MessagePosted($user, $message, $request->channel_id));
    }
    public function detail($messageId)
    {
        $message = Message::find($messageId)->first();
        return $message;
    }
    public function dialog(Request $request)
    {
        // hiện tất cả group
        // chỉ hiện với những user đã nhắn tin
        // sắp xếp theo thời gian tin nhắn gần nhất
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
}
