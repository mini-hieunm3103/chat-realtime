<?php

namespace App\Http\Controllers;

use App\Models\Chatroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;
class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($base10)
    {
        /*
         - base10 sẽ convert về base 37
            + nếu có dạng: ch-{id} thì là group chat
            + nếu có dạng: dm-{id} thì là direct-message: nhắn tin riêng
         * */
        $decode = convertBasePhp($base10, 10, 37);
        $explode = explode('-', $decode);
        $type = $explode[0];
        $id = $explode[1];
        if ($type == 'ch') {
            $this->chatRoom($id);
        } else {
            $this->inbox($id);
        }
    }

    public function chatRoom($id)
    {
        // id là id của group -> id channel -> all messages của group đó
    }
    public function inbox($id)
    {
        // id là id user ->
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
        $chatroom = Chatroom::create([
            'name' => $request->name,
            'topic' => $request->topic,
            'description' => $request->description,
            'user_id' => Auth::id()
        ]);
        $chatroomUsers = [];
        foreach ($request->users as $user) {
            $chatroomUsers[$user] = [
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            ];
        }
        $chatroom->users()->attach($chatroomUsers);
        return Redirect::route('welcome');
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatroom $chatroom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chatroom $chatroom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Chatroom $chatroom)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chatroom $chatroom)
    {
        //
    }
}
