<?php

namespace App\Services\Actions;

use App\Mail\ContactMailable;
use App\Services\Contracts\ContactServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class SendContactAction implements ContactServiceInterface
{
    public function send(array $data): JsonResponse
    {
        Mail::to(config('mail.from.address'))->send(new ContactMailable(
            senderName: $data['name'],
            senderEmail: $data['email'],
            messageContent: $data['message'],
        ));

        return jsonResponse(['message' => 'Message sent successfully']);
    }

    public function __invoke(array $data): JsonResponse
    {
        return $this->send($data);
    }
}