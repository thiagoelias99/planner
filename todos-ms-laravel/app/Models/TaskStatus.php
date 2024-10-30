<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskStatus extends Model
{
    /** @use HasFactory<\Database\Factories\TodoStatusFactory> */
    use HasFactory;
    public $timestamps = false;

    public function todos()
    {
        return $this->hasMany(Task::class);
    }
}
