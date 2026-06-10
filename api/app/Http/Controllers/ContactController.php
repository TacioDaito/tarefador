<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMailable;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Send a contact email.
     *
     * @param ContactRequest $request
     * @return JsonResponse
     */
    public function send(ContactRequest $request): JsonResponse
    {
        $data = $request->validated();

        Mail::to(config('mail.from.address'))->send(new ContactMailable(
            senderName: $data['name'],
            senderEmail: $data['email'],
            messageContent: $data['message'],
        ));

        return jsonResponse(['message' => 'Message sent successfully']);
    }
}