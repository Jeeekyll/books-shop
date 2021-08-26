<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

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
        return response([
            'items' => $categories,
        ]);
    }

    public function show($slug)
    {
        $category = Category::query()->firstWhere('slug', $slug);
        $category->books;

        return response([
            'category' => $category,
        ]);
    }
}
