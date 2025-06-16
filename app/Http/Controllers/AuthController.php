<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Handle user login.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        if (auth()->attempt($request->validated())) {
            $request->session()->regenerate();
            return jsonResponse(['user' => auth()->user()]);
        }
        
        return jsonResponse(['message' => 'Invalid credentials'], 401);
    }

    /**
     * Handle user logout.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        auth()->guard('web')->logout(); // https://github.com/laravel/sanctum/issues/87
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return jsonResponse();
    }
}
