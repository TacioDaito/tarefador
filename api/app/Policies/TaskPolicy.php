<?php
namespace App\Policies;

use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    public function modify(User $user, Task $task)
    {
        return $user->id === $task->created_by
        || $user->isAdmin();
    }
}
