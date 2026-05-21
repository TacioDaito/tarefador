<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return response()->json(['message' => 'API Tarefador']);
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/user', [UserController::class, 'store'])->name('user.store');

Route::middleware(['auth:sanctum'])->group(function () {

    Route::apiResource('user', UserController::class)->only(['index', 'update', 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::apiResource('tasks', TaskController::class);
    Route::put('/tasks/{task}/users', [TaskController::class, 'updateUsers']);

});