<?php

namespace App\Services\Contracts;

use Illuminate\Http\JsonResponse;

interface ContactServiceInterface
{
    public function send(array $data): JsonResponse;
}