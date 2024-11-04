<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskGroup extends Model
{
    /** @use HasFactory<\Database\Factories\TaskGroupFactory> */
    use HasFactory, HasUuids;
    protected $fillable = ['title', 'user_id'];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'group_id');
    }
}
