<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskGroupResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $tasks_count = $this->tasks()->where('status', '<>', 'deleted')->count();
        $tasks_completed = $this->tasks->where('status', "completed")->count();
        $completion_rate = $tasks_count > 0 ? $tasks_completed / $tasks_count : 0;

        return [
            "id" => $this->id,
            "title" => $this->title,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "tasks_count" => $tasks_count,
            "tasks_completed" => $tasks_completed,
            "completion_rate" => $completion_rate,
            "tasks" => TaskResource::collection($this->tasks),
        ];
    }
}
