<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function fileUpload(Request $request)
    {
        $uploadedFiles = $request->image->store('public/images');
        return response(['image' => $uploadedFiles]);
    }
}
