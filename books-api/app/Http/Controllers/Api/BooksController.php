<?php

namespace App\Http\Controllers\Api;

use App\Filters\BookFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\Book\BookResource;
use App\Http\Resources\Book\SingleBookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


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

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'pages' => 'required|min:1|max:3000',
            'rating' => 'required|min:0|max:5',
            'user_id' => 'required',
            'category_id' => 'required',
        ]);

        return new BookResource(
            Book::query()->create($request->all())
        );
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'pages' => 'required|min:1|max:3000',
            'rating' => 'required|min:0|max:5',
            'user_id' => 'required',
            'category_id' => 'required',
        ]);

        $book = Book::query()->find($id)->update($request->all());
        return new BookResource($book);
    }

    public function destroy($id)
    {
        Book::query()->find($id)->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function search($name)
    {
        return Book::query()->where(
            'title', 'like', '%' . $name . '%'
        )->simplePaginate(2);
    }
}
