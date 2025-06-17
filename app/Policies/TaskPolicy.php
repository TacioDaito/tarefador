<?php
namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    public function update(User $user, Task $task)
    {
        return $task->users->contains($user)
        || $user->id === $task->created_by;
    }

    public function delete(User $user, Task $task)
    {
        return $user->id === $task->created_by;
    }
}
