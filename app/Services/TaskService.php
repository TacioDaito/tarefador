<?php
namespace App\Services;

use App\Models\Task;
use App\Models\User;
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

        if (isset($validatedData['users'])) {
            $userIds = array_column($validatedData['users'], 'id');
            $task->users()->sync($userIds);
            $task->load('users');
        }

        return $task;
    }

    public function updateTask(Task $task, array $validatedData): Task
    {
        if (isset($validatedData['completed'])) {
            $task->completed_at = $validatedData['completed'] ? now() : null;
        }

        if (array_key_exists('users', $validatedData)) {
            $userIds = collect($validatedData['users'])->map(function ($user) {
                return is_array($user) ? $user['id'] : $user;
            })->all();
            $userIds = array_column($validatedData['users'], 'id');
            $task->users()->sync($userIds);
            unset($validatedData['users']);
        }

        $task->update($validatedData);
        $task->load('users');

        return $task;
    }
}
