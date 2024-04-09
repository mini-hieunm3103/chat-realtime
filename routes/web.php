<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\FileController;
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
    Route::get('/t/{base10}', [ChatController::class, 'chatting'])->where('base10', '[0-9]+')->name('chatting');
    Route::post('upload/image', [FileController::class, 'upload'])->name('upload');

    Route::group(['prefix' => 'user', 'as' => 'user.'], function (){
        Route::get('', [UserController::class, 'getAllUsers'])->name('getAllUsers');
        Route::post('/invite-friend', [UserController::class, 'inviteFriend'])->name('invite');
        Route::patch('/update-account', [UserController::class, 'updateAccount'])->name('updateAccount');
        Route::patch('/update-details', [UserController::class, 'updateDetails'])->name('updateDetails');
        Route::get('/getUsersChannel/{channel_id}', [ChatController::class, 'getUsersChannel'])->name('getUsersChannel');
    });
    Route::group(['prefix' => 'room'], function (){
        Route::post('/group/store', [GroupController::class, 'store'])->name('group.store');
        Route::patch('/group/addUsers', [GroupController::class, 'addUsers'])->name('group.addUsers');
        Route::get('/group/{group_id}', [GroupController::class, 'detail'])->name('group.detail');
        Route::post('/direct-message', [ChatController::class, 'directMessage'])->name('directMessage');
    });
    Route::group(['prefix'=> 'message', 'as'=> 'message.'], function (){
        Route::get('/dialog', [ChatController::class, 'dialog'])->name('dialog');
        Route::post('/direct-message', [ChatController::class, 'directMessage'])->name('direct');
        Route::get('/{channel_id}', [ChatController::class, 'getMessages'])->name('getMessages');
        Route::post('/', [ChatController::class, 'postMessage'])->name('postMessage');
    });
});

require __DIR__.'/auth.php';

