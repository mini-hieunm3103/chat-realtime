<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\GroupResource;
use App\Models\Channel;
use App\Models\File;
use App\Models\Group;
use App\Models\GroupDetail;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class GroupController extends Controller
{
    public function detail($group_id)
    {
        $group = Group::with(['groupDetail.groupAvatarFile'])->where('id', $group_id)->first();
        return (new GroupResource($group));
    }
    public function create(Request $request)
    {
        $request->validate([
            // nếu cùng 1 user thì không được đặt tên group giống nhau
            'name' => 'required|string|max:100',
            'users' => 'required|min:2|array'
        ], [
            'users.min' => 'Group requires 3 people: you and 2 others!',
            'users.required' => 'Group requires 3 people: you and 2 others!'
        ]);
        $channel = Channel::create([
            'name' => $request->name,
            'type' => 'group'
        ]);
        $group = Group::create([
            'name' => $request->name,
            'owner' => Auth::id(),
            'channel_id' => $channel->id,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
        $groupUsers = [
            Auth::id() => [
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ]
        ];
        foreach ($request->users as $user) {
            $groupUsers[$user] = [
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ];
        }
        $channel->users()->attach($groupUsers);
        $group->admins()->attach(Auth::id());
        $groupDetail = new GroupDetail();
        $groupDetail->group_id = $group->id;
        $groupAvatarFile = $request->file('avatar_file');
        if ($groupAvatarFile) {
            $groupAvatarFileOriginalName = $groupAvatarFile->getClientOriginalName();
            $groupAvatarFileNameInStorage = time() . '_' . $groupAvatarFileOriginalName;
            Storage::disk('public')->putFileAs('/images/avatars', $groupAvatarFile, $groupAvatarFileNameInStorage);

            $file = new File();
            $file->name = $groupAvatarFileOriginalName;
            $file->path ='/images/avatars/'.$groupAvatarFileNameInStorage;
            $file->size = $groupAvatarFile->getSize();
            $file->save();

            $groupDetail = new GroupDetail();
            $groupDetail->group_id = $group->id;
            $groupDetail->avatar_id = $file->id;
        }
        $groupDetail->save();
        return Redirect::route('chatting', convertBasePhp('gr-'.$group->id, 37, 10));
    }

    public function update(Request $request): RedirectResponse
    {
        $rules = [
            'name'=> ['required', 'string', 'max:255']
        ];
        $request->validate($rules);
        $group = Group::find($request->group_id)->first();
        $group->name = $request->name;
        if ($request->hasFile('avatar_file')) {
            $newAvatarFile = $request->file('avatar_file');
            $oldAvatarFileDB = $group->groupDetail->groupAvatarFile;

            $newAvatarFileOriginalName = $newAvatarFile->getClientOriginalName();
            $newAvatarFileNameInStorage = formatFileNameInStorage($newAvatarFileOriginalName);
            Storage::disk('public')->putFileAs('images', $newAvatarFile, $newAvatarFileNameInStorage);

            $file = new File();
            $file->name = $newAvatarFileOriginalName;
            $file->path ='/images/'.$newAvatarFileNameInStorage;
            $file->size = $newAvatarFile->getSize();
            $file->save();

            $group->groupDetail->avatar_id = $file->id;
            $group->groupDetail->save();
            if ($oldAvatarFileDB){
                Storage::disk('public')->delete($oldAvatarFileDB->path);
                $oldAvatarFileDB->delete();
            }
        }
        $group->save();
        return Redirect::back();
    }

    public function deleteAvatar(Request $request): RedirectResponse
    {
        $group = Group::find($request->group_id);
        if ($group->groupDetail->avatar_id){
            Storage::disk('public')->delete($group->groupDetail->groupAvatarFile->path);
            $group->groupDetail->avatar_id = null;
            $group->groupDetail->save();
            $group->groupDetail->groupAvatarFile->delete();
        }
        return Redirect::back();
    }
    public function addUsers(Request $request)
    {
        foreach ($request->users as $userId) {
            $addUsers[$userId] = [
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ];
        }
        Channel::find($request->channelId)->users()->attach($addUsers);
        return Redirect::back();
    }
}
