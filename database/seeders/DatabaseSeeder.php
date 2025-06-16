<?php
namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = User::factory()->count(5)->create();

        $tasks = Task::factory()->count(10)->make()->each(function ($task) use ($users) {
            $task->created_by = $users->random()->id;
            $task->save();
        });

        foreach ($tasks as $task) {
            $task->users()->attach($users->random(rand(1, 3))->pluck('id')->toArray());
        }
    }
}
