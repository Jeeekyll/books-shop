<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;

class CategoriesController extends Controller
{
    public function index()
    {
        //select TOP 5 POPULAR categories
        $categories = Category::query()
            ->withCount('books')
            ->orderBy('books_count', 'desc')
            ->get();
        return response()->json(['data' => $categories]);
    }

    public function show($slug)
    {
        $category = Category::query()->firstWhere('slug', $slug);
        $books = Book::query()->where(
            'category_id', $category->id)->paginate(6);

        return response([
            'category' => $category,
            'books' => $books
        ]);
    }
}
