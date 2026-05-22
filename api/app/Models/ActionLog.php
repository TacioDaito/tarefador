<?php
namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class ActionLog extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'action_logs';

    protected $fillable = [
        'user_id',
        'action',
        'task_id',
        'details',
        'ip',
        'created_at',
    ];

    public $timestamps = false;
}
