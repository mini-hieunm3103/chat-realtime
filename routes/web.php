<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatroomController;
use App\Http\Resources\UserResource;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $user = new UserResource(auth()->user());
    return Inertia::render('Welcome', [
        'auth' => $user
    ]);
})->middleware(['auth'])->name('welcome');


Route::middleware('auth')->group(function () {
    Route::get('/settings', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/settings', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/settings', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
Route::group(
    [
        'prefix' => 'user',
        'as' => 'user.',
        'middleware' => 'auth'
    ]
    , function (){
    Route::get('/get-all-users', [UserController::class, 'getAllUsers'])->name('get-all-users');
    Route::post('/invite-friend', [UserController::class, 'inviteFriend'])->name('invite');
});
Route::group(
    []
    , function (){
    Route::resource('chatroom', ChatroomController::class);
});
Route::get('/chatroom-1', function (){
    return Inertia::render('Chatting/Chat', []);
})->middleware('auth');
