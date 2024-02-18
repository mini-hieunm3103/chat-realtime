<?php

namespace App\Http\Controllers;

use App\Models\Chatroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

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
            'name' => 'required|string|max:20',
            'topic' => 'nullable|string|max:50',
            'description' => 'required|string|max:200'
        ]);
//        dd($request);
        $chatroom = Chatroom::create([
            'name' => $request->name,
            'topic' => $request->topic,
            'description' => $request->description,
            'user_id' => Auth::id()
        ]);
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
