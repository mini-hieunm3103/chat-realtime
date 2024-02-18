<?php

namespace App\Http\Controllers;

use App\Models\Chatroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;
class ChatroomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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
