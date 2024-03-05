<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RouteController extends Controller
{
    //
    public function welcome()
    {
        $user = Auth::user();
        $detail = $user->detail;
        $user->detail = $detail;
        $user = new UserResource(auth()->user());
        return Inertia::render('Welcome', [
            'auth' => $user
        ]);
    }

    public function settings(Request $request): Response
    {
        $user = Auth::user();
        $detail = $user->detail;
        $user->detail = $detail;
        $user =  new UserResource($user);
        return Inertia::render('Setting/Edit', [
            'auth' => $user,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
