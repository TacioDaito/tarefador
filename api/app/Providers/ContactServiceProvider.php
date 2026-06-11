<?php

namespace App\Providers;

use App\Services\Actions\SendContactAction;
use App\Services\Contracts\ContactServiceInterface;
use Illuminate\Support\ServiceProvider;

class ContactServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(ContactServiceInterface::class, SendContactAction::class);
    }

    public function boot(): void
    {
        //
    }
}