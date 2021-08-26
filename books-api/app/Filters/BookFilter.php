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

    public function sort($value)
    {
        $sortDirection = str_starts_with($value, '-') ? 'desc' : 'asc';
        if (Schema::hasColumn('books', $value)) {
            return $this->builder->orderBy($value, $sortDirection);
        }
        return $this->builder;
    }
}
