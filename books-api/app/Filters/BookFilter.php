<?php

namespace App\Filters;

use Illuminate\Support\Facades\Schema;

class BookFilter extends QueryFilter
{
    public function pages($value)
    {
        return $this->builder->where('pages', $value);
    }

    public function rating($value)
    {
        return $this->builder->where('rating', $value);
    }

    public function title($value)
    {
        return $this->builder->where('title', $value);
    }

    public function date($value)
    {
        return $this->builder->where('created_at', $value);
    }


    public function sort($value)
    {
        $sortDirection = str_starts_with($value, '-') ? 'desc' : 'asc';
        //to remove minus symbol
        if ($sortDirection === 'desc') {
            $value = mb_substr($value, 1);
        }

        if (Schema::hasColumn('books', $value)) {
            return $this->builder->orderBy($value, $sortDirection);
        }
        return $this->builder;
    }
}
