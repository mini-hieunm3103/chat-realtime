<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Mail\InviteFriendsEmail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function getAllUsers(Request $request)
    {
        $users = User::orderBy('name');
        if ($request->has('keyword')){
            $keyword = $request->keyword;
            $users = $users->where(function ($query) use ($keyword){
                $query->orWhere('name', 'like', '%'.$keyword.'%');
                $query->orWhere('email', 'like', '%'.$keyword.'%');
            });
        }
        if ($request->has('online')){
            $onlineIdArr = $request->online;
            $users = $users->where(function ($query) use ($onlineIdArr){
                foreach ($onlineIdArr as $item) {
                    $query->orWhere('id', '=', $item);
                }
            });
        }
        $users = $users->with('detail')->get();
        return UserResource::collection($users);
    }
    public function inviteFriend(Request $request)
    {
        $rules = [
            'messages' => 'required|string|max:255',
            'emailArr' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (count($value) > 3) {
                        $fail('Emails may not have more than 3 items.');
                    }
                }
            ],
            'emailArr.*' =>[
                function ($attribute, $value, $fail) {
                    $validation = Validator::make(
                        ['data' => $value],
                        ['data' => 'string|lowercase|email|max:255|unique:users,email'],
                        [
                            'email' => $value.' must be a valid email.',
                            'lowercase' => $value.' must be lowercase.',
                            'unique' => $value.' has been registered!'
                        ]
                    );
                    if ($validation->fails()){
                        foreach ($validation->messages()->all() as $item) {
                            $fail($item);
                         };
                    }
                },
            ],
        ];
        $request->validate($rules, ['emailArr.required' => "Please enter emails!"]);
        $emails = $request->emailArr;
        $user = Auth::user();
        foreach ($emails as $email) {
            Mail::to($email)->send(new InviteFriendsEmail($user, $request->messages));
        }
        return Redirect::route('welcome');
    }
    public function updateAccount(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:users,email,'.$user->id ],
        ];
        $request->validate($rules);
        $user->name = $request->name;
        $user->email = $request->email;
        if ($user->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }
        $user->save();
        return Redirect::route('settings');
    }
    public function updateDetails(Request $request)
    {
        $rules = [
            'bio' => ['nullable', 'string', 'max:255'],
            'twitter' => ['nullable','url', 'max:100'],
            'facebook' => ['nullable','url', 'max:100'],
            'github' => ['nullable','url', 'max:100'],
        ];
        $request->validate($rules);
        $details = User::find(Auth::id())->detail;
        $details->bio = $request->bio;
        $details->twitter = $request->twitter;
        $details->facebook = $request->facebook;
        $details->github = $request->github;
        $details->save();
        return Redirect::route('settings');
    }
    public function destroy(Request$request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
