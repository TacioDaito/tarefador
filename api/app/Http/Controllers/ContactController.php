<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Services\Contracts\ContactServiceInterface;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function __construct(
        private readonly ContactServiceInterface $contactService,
    ) {}

    /**
     * Send a contact email.
     *
     * @param ContactRequest $request
     * @return JsonResponse
     */
    public function send(ContactRequest $request): JsonResponse
    {
        return $this->contactService->send($request->validated());
    }
}