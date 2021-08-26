<?php

namespace App\Http\Controllers\Api;

use App\Filters\BookFilter;
use App\Http\Controllers\Controller;
use App\Models\Book;
use Illuminate\Http\Request;

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

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Book::filter($this->bookFilter)->paginate(5);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'rating' => 'required',
            'pages' => 'required',
        ]);

        return Book::query()
            ->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $book = Book::query()
            ->with('user', 'category', 'tags')
            ->firstWhere('slug', $slug);

        return response()->json([
            'item' => [
                'title' => $book->title,
                'description' => $book->description,
                'pages' => $book->pages,
                'rating' => $book->rating,
                'created_at' => $book->getBookDate(),
                'slug' => $book->slug,
                'category' => $book->category,
                'user' => $book->user,
                'tags' => $book->tags,

            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'rating' => 'required',
            'pages' => 'required',
        ]);

        $book = Book::query()->findOrFail($id);
        $book->update($request->all());
        return $book;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Book::query()->findOrFail($id)->delete();
    }

    public function search($name)
    {
        return Book::query()->where(
            'title', 'like', '%' . $name . '%'
        )->paginate(5);
    }
}
