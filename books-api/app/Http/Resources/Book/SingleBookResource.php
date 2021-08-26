<?php

namespace App\Http\Resources\Book;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\TagResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SingleBookResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
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
            'created_at' => $this->getBookDate(),
            'category' => CategoryResource::make($this->category),
            'user' => UserResource::make($this->user),
            'tags' => TagResource::collection($this->tags),
        ];
    }
}
