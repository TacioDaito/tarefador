<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'created_by',
        'completed',
        'completed_at',
    ];

    protected $casts = [
        'created_by'   => 'integer',
        'completed'    => 'boolean',
        'completed_at' => 'datetime',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeAssignedOrOwnedBy($query, User $user): Builder
    {
        return $query->where(function ($query2) use ($user) {
            $query2->where('created_by', $user->id)
                ->orWhereHas('users', function ($query3) use ($user) {
                    $query3->where('users.id', $user->id);
                });
        });
    }

    public function scopeCompleted($query, $completed = true)
    {
        return $query->where('completed', $completed);
    }

    public function scopeWithDescription($query, $withDescription = true)
    {
        return $withDescription ? $query->whereNotNull('description') : $query->whereNull('description');
    }

    public function scopeHasUsers($query, $withUsers = true)
    {
        return $withUsers ? $query->whereHas('users') : $query->whereDoesntHave('users');
    }

    public function scopeOrderByCreatedAt($query, $orderByCreatedAt = true)
    {
        return $orderByCreatedAt ? $query->orderBy('created_at') : $query->orderByDesc('created_at');
    }
}
