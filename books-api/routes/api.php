<?php

use App\Http\Controllers\Api\BooksController;
use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TagsController;
use App\Http\Controllers\AuthController;

use Illuminate\Support\Facades\Route;

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

//Public routes

//auth routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
//books routes
Route::get('books', [BooksController::class, 'index']);
Route::get('books/{slug}', [BooksController::class, 'show']);
Route::get('books/search/{name}', [BooksController::class, 'search']);
//categories routes
Route::get('categories', [CategoriesController::class, 'index']);
Route::get('categories/{slug}', [CategoriesController::class, 'show']);
//tags routes
Route::get('tags', [TagsController::class, 'index']);

Route::post('books/{id}/image', [BooksController::class, 'updateImage']);

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    //auth routes
    Route::get('me', [AuthController::class, 'getCurrentUser']);
    Route::post('logout', [AuthController::class, 'logout']);
    //user routes
    Route::get('user', [UserController::class, 'index']);
    //books routes
    Route::post('books', [BooksController::class, 'store']);
   // Route::post('books/{id}/image', [BooksController::class, 'updateImage']);
    Route::put('books/{id}', [BooksController::class, 'update']);
    Route::delete('books/{id}', [BooksController::class, 'destroy']);
});
