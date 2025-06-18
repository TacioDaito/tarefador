<?php
namespace App\Http\Controllers;

use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Http\Requests\Task\GetTaskRequest;
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

    public function filteredIndex(GetTaskRequest $request)
    {
        $tasks = $this->taskService->getFilteredTasks($request->validated());

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
        $this->authorize('modify', $task);

        $task = $this->taskService->updateTask($task, $request->validated());

        return jsonResponse(['task' => $task]);
    }

    public function updateUsers(UpdateTaskRequest $request, Task $task)
    {
        $task = $this->taskService->updateTaskUsers($task, $request->validated());

        if ($task === false) {
            return jsonResponse(['message' => 'No users updated'], 204);
        }

        return jsonResponse(['task' => $task]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('modify', $task);

        $task->delete();

        return jsonResponse(['message' => 'Task deleted successfully']);
    }
}
