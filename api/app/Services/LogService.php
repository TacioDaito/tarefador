<?php

namespace App\Services;

use App\Models\ActionLog;

class LogService
{
    /**
     * Log an action performed by a user.
     *
     * @param int $userId
     * @param string $action
     * @param int|null $taskId
     * @param array $details
     * @param string|null $ip
     */
    public static function log($userId, $action, $taskId = null, $details = [], $ip = null)
    {
        ActionLog::create([
            'user_id' => $userId,
            'action' => $action,
            'task_id' => $taskId,
            'details' => $details,
            'ip' => $ip,
            'created_at' => now()
        ]);
    }
}
