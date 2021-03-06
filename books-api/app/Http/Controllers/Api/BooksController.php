<?php

namespace App\Http\Controllers\Api;

use App\Filters\BookFilter;
use App\Http\Controllers\Controller;
use App\Http\Resources\Book\BookResource;
use App\Http\Resources\Book\SingleBookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

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
            Book::filter($this->bookFilter)->paginate(6)
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

        $book = Book::query()->create($request->all());
        $book->tags()->sync($request->tags);
        return new BookResource($book);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'pages' => 'required|min:1|max:3000',
            'rating' => 'required|min:0|max:5',
            'category_id' => 'required',
        ]);

        $book = Book::find($id);
        $book->update($request->all());
        $book->tags()->sync($request->tags);

        return new BookResource($book);
    }

    public function updateImage(Request $request, $id)
    {
        $request->validate([
            'image' => 'image:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $data = $request->all();
        if ($request->hasFile('image')) {
            $uploadFolder = 'images';
            $image = $request->file('image');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $data['image'] = Storage::disk('public')->url($image_uploaded_path);
        }
        $book = Book::query()->find($id);
        $book->update($data);
        return $book;
    }

    public function destroy($id)
    {
        $book = Book::query()->find($id);
        $book->delete();
        $book->tags()->sync([]);
        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function search($name)
    {
        return Book::query()->where(
            'title', 'like', '%' . $name . '%'
        )->simplePaginate(2);
    }
}
