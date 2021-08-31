<?php

namespace App\Http\Resources\Book;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */


    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'pages' => $this->pages,
            'rating' => $this->rating,
            'slug' => $this->slug,
            'image' => $this->image,
            'category_id' => $this->category_id,
            'created_at' => $this->created_at,
            'tags' => $this->tags,
        ];
    }

}
