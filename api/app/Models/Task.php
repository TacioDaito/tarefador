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

    public function scopeAssignedOrOwnedByUser($query, $userId): Builder
    {
        return $query->where(function ($query2) use ($userId) {
            $query2->where('created_by', $userId)
                ->orWhereHas('users', function ($query3) use ($userId) {
                    $query3->where('users.id', $userId);
                });
        })->orderBy('created_at', 'desc');
    }

    public function scopeCompleted($query, $completed = true): Builder
    {
        return $query->where('completed', $completed);
    }

    public function scopeWithDescription($query, $withDescription = true): Builder
    {
        return $withDescription ? $query->whereNotNull('description') : $query->whereNull('description');
    }

    public function scopeWithUsers($query, $withUsers = true): Builder
    {
        return $withUsers ? $query->whereHas('users') : $query->whereDoesntHave('users');
    }
}
