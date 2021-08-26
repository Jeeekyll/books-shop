<?php

namespace App\Http\Resources;

use App\Http\Resources\Book\BookResource;
use App\Http\Resources\Book\SingleBookResource;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'books' => BookResource::collection($this->books),
        ];
    }
}
