<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Channel;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class RouteController extends Controller
{
    public function welcome()
    {
        return Inertia::render('Welcome', [
            'auth' => getAuthUserResource()
        ]);
    }

    public function settings(Request $request): Response
    {
        return Inertia::render('Setting/Edit', [
            'auth' => getAuthUserResource(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
