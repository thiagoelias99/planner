<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return TaskResource::collection(
            Task::orderBy('created_at', 'desc')
            ->paginate(100)
        );

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create([
            "title" => $request->title,
            "status" => "pending",
            "user_id" => "598cdfe9-951b-4341-85d9-f9ca75394eb6",
            "group_id" => $request->group_id
        ]);

        return response()->json([
            $task
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update([
            "title" => $request->title,
            "status" => $request->status
        ]);

        if ($task->status == "completed") {
            $task->completed_at = now();
        } else {
            $task->completed_at = null;
        }
        $task->save();

        return response()->json([
            $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response([], 204);
    }
}
