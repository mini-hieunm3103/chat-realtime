<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RouteController;
use App\Http\Controllers\GroupController;
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
    Route::get('/t/{base10}', [ChatController::class, 'index'])->where('base10', '[0-9]+');

    Route::group(['prefix' => 'user', 'as' => 'user.'], function (){
        Route::get('/get-all-users', [UserController::class, 'getAllUsers'])->name('get-all-users');
        Route::post('/invite-friend', [UserController::class, 'inviteFriend'])->name('invite');
        Route::patch('/update-account', [UserController::class, 'updateAccount'])->name('updateAccount');
        Route::patch('/update-details', [UserController::class, 'updateDetails'])->name('updateDetails');
    });
    Route::group(['prefix' => 'group', 'as' => 'group.'], function (){
        Route::post('/', [GroupController::class, 'store'])->name('store');
    });
});

require __DIR__.'/auth.php';

