<?php
namespace App\Services;

use App\Models\Task;
use App\Models\User;
use App\Services\LogService;
use App\Http\Requests\Task\GetTaskRequest;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    protected LogService $logService;
    public function __construct(LogService $logService)
    {
        $this->logService = new LogService();
    }

    public function getUserTasks($user): Collection
    {
        return Task::with('users')
            ->assignedOrOwnedBy($user)
            ->orderByDesc('created_at')
            ->get();
    }

    public function getFilteredTasks($validatedRequest): Collection
    {
        $query = Task::query();

        foreach ($validatedRequest as $scope => $value) {
            if (isset($scope)) {
                $query->{$scope}($value);
            }
        }
        $query->limit(100)->with('users');

        return $query->get();
    }

    public function createTask(array $validatedData, User $creatorUser): Task
    {
        $task = Task::create($validatedData + ['created_by' => $creatorUser->id]);

        if ($this->updateTaskUsers($task, $validatedData)) {
            $task->load('users');
        }

        $this->logService->log(
            $creatorUser->id,
            'create_task',
            $task->id,
            ['title' => $task->title],
            request()->ip()
        );

        return $task;
    }

    public function updateTask(Task $task, array $validatedData): Task
    {
        if ($this->updateTaskUsers($task, $validatedData)) {
            unset($validatedData['users']);
        }

        if (isset($validatedData['completed'])) {
            $task->completed_at = $validatedData['completed'] ? now() : null;
        }

        $task->update($validatedData);
        $task->load('users');

        $this->logService->log(
            $task->created_by,
            'update_task',
            $task->id,
            ['title' => $task->title],
            request()->ip()
        );

        return $task;
    }

    public function updateTaskUsers(Task $task, array $validatedData): Task | bool
    {
        if (array_key_exists('users', $validatedData)) {
            $userIds = array_column($validatedData['users'], 'id');
            $task->users()->sync($userIds);

            $this->logService->log(
                $task->created_by,
                'update_task_users',
                $task->id,
                ['users' => $userIds],
                request()->ip()
            );

            return $task;
        } else {
            return false;
        }
    }

}
