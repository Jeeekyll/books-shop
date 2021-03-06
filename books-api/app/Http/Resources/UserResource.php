<?php

namespace App\Http\Resources;

use App\Http\Resources\Book\BookResource;
use App\Http\Resources\Book\SingleBookResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'nickname' => $this->name,
            'email' => $this->email,
            'created_at' => $this->getUserDate(),
            'books' => BookResource::collection($this->books)
        ];
    }
}
