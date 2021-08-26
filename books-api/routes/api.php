<?php

use App\Http\Controllers\Api\BooksController;
use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
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

//categories routes
Route::get('categories', [CategoriesController::class, 'index']);
Route::get('categories/{slug}', [CategoriesController::class, 'show']);

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    //auth routes
    Route::get('me', [AuthController::class, 'getCurrentUser']);
    Route::post('logout', [AuthController::class, 'logout']);

    //books routes
    //Route::apiResource('books', BooksController::class);
    Route::get('books/search/{name}', [BooksController::class, 'search']);
});

//Route::get('books', function (Request $request) {
//    $sortColumn = $request->input('sort', 'id');
//    $sortDirection = str_starts_with($sortColumn, '-') ? 'desc' : 'asc';
//    $sortColumn = ltrim($sortColumn, '-');
//    return \App\Models\Book::query()->orderBy($sortColumn, $sortDirection)->paginate(5);
//});
