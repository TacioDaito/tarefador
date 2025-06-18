<?php
namespace App\Services;

use App\Models\Task;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;

class TaskService
{
    public function getUserTasks($user): Collection
    {
        return Task::with('users')
            ->assignedOrOwnedBy($user)
            ->orderByDesc('created_at')
            ->get();
    }

    public function createTask(array $validatedData, User $creatorUser): Task
    {
        $task = Task::create($validatedData + ['created_by' => $creatorUser->id]);

            if ($this->updateTaskUsers($task, $validatedData)) {
            $task->load('users');
        }

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

        return $task;
    }

    public function updateTaskUsers(Task $task, array $validatedData): Task|bool
    {
        if (array_key_exists('users', $validatedData)) {
            $userIds = array_column($validatedData['users'], 'id');
            $task->users()->sync($userIds);
            return $task;
        }
        else {
            return false;
        }
    }

}
