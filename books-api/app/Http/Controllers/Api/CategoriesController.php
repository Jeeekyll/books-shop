<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoriesController extends Controller
{
    public function index()
    {
        //select TOP 5 POPULAR categories
        $categories = Category::query()
            ->withCount('books')
            ->orderBy('books_count', 'desc')
            ->take(5)
            ->get();
        return response()->json(['data' => $categories]);
    }

    public function show($slug)
    {
        return new CategoryResource(
            Category::query()->firstWhere('slug', $slug)
        );
    }
}
