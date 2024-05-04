<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Http\Resources\UsersChannelResource;
use App\Mail\InviteFriendsEmail;
use App\Models\Channel;
use App\Models\File;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
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
        if (!$request->needAuth) {
            $users = $users->where('id', '<>', Auth::id());
        }
        $users = $users->with('userDetail.userAvatarFile')->paginate(10)->withQueryString();
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
        $user = getAuthUserResource();
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
            'avatar_file' => ['nullable', 'image', 'mimes:jpeg,gif,png', 'max:3064'],
            'bio' => ['nullable', 'string', 'max:255'],
            'twitter' => ['nullable','url', 'max:100'],
            'facebook' => ['nullable','url', 'max:100'],
            'github' => ['nullable','url', 'max:100'],
        ];
        $request->validate($rules);
        if ($request->isUpdateDetail){
            $details = getAuthUserResource()->userDetail;
            $details->bio = $request->bio;
            $details->twitter = $request->twitter;
            $details->facebook = $request->facebook;
            $details->github = $request->github;
            $newAvatarFile = $request->file('avatar_file');
            if ($newAvatarFile){
                $oldAvatarFileDB = $details->userAvatarFile;

                $newAvatarFileOriginalName = $newAvatarFile->getClientOriginalName();
                $newAvatarFileNameInStorage = formatFileNameInStorage($newAvatarFileOriginalName);
                Storage::disk('public')->putFileAs('images', $newAvatarFile, $newAvatarFileNameInStorage);

                $file = new File();
                $file->name = $newAvatarFileOriginalName;
                $file->path ='/images/'.$newAvatarFileNameInStorage;
                $file->size = $newAvatarFile->getSize();
                $file->save();

                $details->avatar_id = $file->id;
                $details->save();

                if ($oldAvatarFileDB) {
                    Storage::disk('public')->delete($oldAvatarFileDB->path);
                    $oldAvatarFileDB->delete();
                }
            }
            $details->save();
        }
        return Redirect::route('settings');
    }
    public function deleteAvatar(Request $request)
    {
        $user = getAuthUserResource();
        $userDetail = $user->userDetail;
        $oldAvatarFileDB = $user->userDetail->userAvatarFile;
        if (!$oldAvatarFileDB) abort(404);
        $userDetail->avatar_id = null;
        $userDetail->save();

        Storage::disk('public')->delete($oldAvatarFileDB->path);
        $oldAvatarFileDB->delete();
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
