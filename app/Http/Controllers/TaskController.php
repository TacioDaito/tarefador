<?php
namespace App\Http\Controllers;

use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Services\TaskService;
use App\Models\Task;

class TaskController extends Controller
{
    protected TaskService $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = $this->taskService->getUserTasks(auth()->user());

        return jsonResponse(['tasks' => $tasks]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $task = $this->taskService->createTask($request->validated(), auth()->user());

        return jsonResponse(['task' => $task], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return jsonResponse(['task' => $task->load('users')]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        $task = $this->taskService->updateTask($task, $request->validated());

        return jsonResponse(['task' => $task]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return jsonResponse(['message' => 'Task deleted successfully']);
    }
}
