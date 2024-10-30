<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TodoFactory> */
    use HasFactory, HasUuids;

    public $fillable = ['title', 'status', 'user_id'];

    public function status(){
        return $this->belongsTo(TaskStatus::class);
    }
}
