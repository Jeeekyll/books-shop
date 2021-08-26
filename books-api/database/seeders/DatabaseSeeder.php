<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Book::factory(20)->create();
        Category::factory(7)->create();
        Tag::factory(15)->create()
            ->each(function ($tag) {
                $book = Book::find(rand(1, 20));
                $tag->books()->save($book);
            });
    }
}
