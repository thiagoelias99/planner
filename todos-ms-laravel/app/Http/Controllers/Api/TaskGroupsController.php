<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskGroupResource;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\TaskGroup;
use App\Http\Requests\StoreTaskGroupRequest;
use App\Http\Requests\UpdateTaskGroupRequest;

class TaskGroupsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TaskGroupResource::collection(TaskGroup::with('tasks')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskGroupRequest $request)
    {
        $user_id = "598cdfe9-951b-4341-85d9-f9ca75394eb6";
        $task_group = TaskGroup::create([
            'title' => $request->title,
            'user_id' => $user_id
        ]);

        return $this->show($task_group);
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskGroup $taskGroup)
    {
        return TaskGroupResource::make($taskGroup);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskGroupRequest $request, TaskGroup $taskGroup)
    {
        //
    }

    public function addTask(string $taskGroupId, string $taskId)
    {
        $task = Task::find($taskId);
        $task->group_id = $taskGroupId;
        $task->save();

        return TaskResource::make(Task::find($taskId));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskGroup $taskGroup)
    {
        //
    }
}
