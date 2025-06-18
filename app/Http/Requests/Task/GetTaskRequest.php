<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class GetTaskRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'completed' => 'sometimes|nullable|boolean',
            'withDescription' => 'sometimes|nullable|boolean',
            'withUsers' => 'sometimes|nullable|boolean',
            // 'orderByCreatedAt' => 'sometimes|nullable|boolean',
            // 'limit' => 'sometimes|nullable|array',
            // 'limit.min' => 'integer|min:1|max:100',
            // 'limit.max' => 'integer|min:1|max:100',
        ];
    }
}
