<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return new UserResource(
            User::query()->findOrFail(auth()->user()->id)
        );
    }
}
