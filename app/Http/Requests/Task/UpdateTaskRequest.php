<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string|max:1000',
            'completed' => 'sometimes|boolean',
            'users' => 'sometimes|array',
            'users.*' => 'exists:users,id',
        ];
    }
}
