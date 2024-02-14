<?php

namespace App\Http\Controllers;

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
    public function index()
    {
        $users = User::get();
        $users = UserResource::collection($users);
        return $users;
    }
    public function inviteFriend(Request $request): RedirectResponse
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
}
