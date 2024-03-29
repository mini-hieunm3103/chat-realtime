<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\GroupResource;
use App\Models\Channel;
use App\Models\Group;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class GroupController extends Controller
{
    public function detail($group_id)
    {
        $groupDetail =  Group::with('admins')->where('id', $group_id)->first();
//        return $groupDetail;
        return new GroupResource($groupDetail);
    }
    public function store(Request $request)
    {
        $request->validate([
            // nếu cùng 1 user thì không được đặt tên group giống nhau
            'name' => 'required|string|max:100',
            'topic' => 'nullable|string|max:50',
            'description' => 'required|string|max:200',
            'users' => 'min:2|array'
        ], [
            'users.min' => 'Group requires 3 people: you and 2 others!'
        ]);
        $channel = Channel::create([
            'name' => $request->name,
            'type' => 'group'
        ]);
        $group = Group::create([
            'name' => $request->name,
            'topic' => $request->topic,
            'description' => $request->description,
            'owner' => Auth::id(),
            'channel_id' => $channel->id
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
        return Redirect::back();
    }
}
