<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'type' => 'user',
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }
    
    /**
     * Handle an incoming authentication request.
     */
    
    public function store(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
    
        if (Auth::guard('web')->attempt($credentials)) {
            $user = Auth::guard('web')->user();
    
            if ($user->role_id !== 1) { // 一般ユーザー用
                Auth::guard('web')->logout();
                return redirect()->route('login')->withErrors(['email' => '一般ユーザーではありません']);
            }
    
            $request->session()->regenerate();
            return redirect()->intended(route('mypage'));
        }
    
        throw ValidationException::withMessages([
            'email' => __('auth.failed'),
        ]);
    }
    

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
