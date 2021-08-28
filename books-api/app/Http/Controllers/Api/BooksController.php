<?php

namespace App\Http\Controllers\Api;

use App\Filters\BookFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\Book\BookResource;
use App\Http\Resources\Book\SingleBookResource;
use App\Models\Book;

class BooksController extends Controller
{
    /**
     * BooksController constructor.
     */
    protected $bookFilter;

    public function __construct(BookFilter $bookFilter)
    {
        $this->bookFilter = $bookFilter;
    }

    public function index()
    {
        return BookResource::collection(
            Book::filter($this->bookFilter)->paginate(4)
        );
    }

    public function show($slug)
    {
        return SingleBookResource::make(
            Book::query()->firstWhere('slug', $slug)
        );
    }

    public function search($name)
    {
        return Book::query()->where(
            'title', 'like', '%' . $name . '%'
        )->paginate(5);
    }
}
