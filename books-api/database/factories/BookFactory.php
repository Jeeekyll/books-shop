<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->text(40);
        $slug = Str::slug($title);
        return [
            'title' => $title,
            'description' => $this->faker->text(300),
            'pages' => rand(150, 900),
            'rating' => rand(0.1, 5.0),
            'slug' => $slug,
            'user_id' => rand(1, 5),
            'category_id' => rand(1, 7),
        ];
    }
}
