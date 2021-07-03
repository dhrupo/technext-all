<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Post;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{id}', [PostController::class, 'show']);
Route::middleware('auth')->post('posts', [PostController::class, 'store']);
Route::middleware('auth')->put('posts/{id}', [PostController::class, 'update']);
Route::middleware('auth')->delete('posts/{id}', [PostController::class, 'destroy']);
Route::middleware('auth')->get('getPostByUser', [PostController::class, 'getPostByUser']);
Route::get('getAllPostByUser/{id}', [PostController::class, 'getAllPostByUser']);

Route::middleware('auth')->post('addComment/{id}', [PostController::class, 'addComment']);
Route::get('getComments/{id}', [PostController::class, 'getComments']);

Route::get('allUsers', [UserController::class, 'index']);
Route::get('users/{id}', [UserController::class, 'show']);

Route::post('register', [UserController::class, 'store']);
Route::post('login', [UserController::class, 'login']);

Route::middleware('auth')->get('/users', function () {
    return auth()->user();
});
