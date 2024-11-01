<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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
        return TaskGroup::with('tasks')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskGroupRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TaskGroup $taskGroup)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskGroupRequest $request, TaskGroup $taskGroup)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskGroup $taskGroup)
    {
        //
    }
}
