<?php

use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ChannelController;
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




Route::middleware('auth')->group(function () {
    Route::get('/', [RouteController::class, 'welcome'])->name('welcome');
    Route::get('/settings', [RouteController::class, 'settings'])->name('settings');
    Route::get('/t/{base10}', [RouteController::class, 'chatting'])->where('base10', '[0-9]+')->name('chatting');

    Route::group(['prefix' => 'user', 'as' => 'user.'], function (){
        Route::get('', [UserController::class, 'getAllUsers'])->name('getAllUsers');
        Route::post('/invite-friend', [UserController::class, 'inviteFriend'])->name('invite');
        Route::patch('/update-account', [UserController::class, 'updateAccount'])->name('updateAccount');
        // use post because we need upload avatar file and inertia just sp post method
        Route::post('/update-details', [UserController::class, 'updateDetails'])->name('updateDetails');

        Route::delete('/delete-avatar', [UserController::class, 'deleteAvatar'])->name('deleteAvatar');
    });
    Route::group(['prefix' => 'group', 'as'=> 'group.'], function (){
        Route::get('/{group_id}', [GroupController::class, 'detail'])->name('detail');
        Route::post('/create', [GroupController::class, 'create'])->name('create');
        Route::post('/update', [GroupController::class, 'update'])->name('update');
        Route::delete('/destroy', [GroupController::class, 'destroy'])->name('destroy');

        Route::patch('/group/users', [GroupController::class, 'addUsers'])->name('addUsers');
        Route::delete('/group/user', [GroupController::class, 'removeUser'])->name('removeUser');

        Route::patch('/group/admins', [GroupController::class, 'addAdmins'])->name('addAdmins');
        Route::delete('/group/admin', [GroupController::class, 'removeAdmin'])->name('removeAdmin');
    });
    Route::group(['prefix'=> 'channel', 'as'=> 'channel.'], function (){
        Route::get('/{channel_id}/media', [ChannelController::class, 'channelMedia'])->name('media');
        Route::get('/{channel_id}/documents', [ChannelController::class, 'channelDocuments'])->name('documents');
        Route::get('/{channel_id}/links', [ChannelController::class, 'channelLinks'])->name('links');
        Route::get('/{channel_id}/messages', [ChannelController::class, 'channelMessages'])->name('messages');
        Route::get('/{channel_id}/users', [ChannelController::class, 'channelUsers'])->name('users');
    });
    Route::group(['prefix'=> 'message', 'as'=> 'message.'], function (){
        Route::get('/dialog', [MessageController::class, 'dialog'])->name('dialog');
        Route::post('/', [MessageController::class, 'post'])->name('post');
        Route::patch('/recall', [MessageController::class, 'recall'])->name('recall');
    });
});

require __DIR__.'/auth.php';

