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

     public function store(LoginRequest $request): RedirectResponse
     {
         $request->authenticate();
 
         $request->session()->regenerate();
 
         return redirect()->intended(route('mypage', absolute: false));
     }
    // public function store(LoginRequest $request): RedirectResponse
    // {
    //     $credentials = $request->only('email', 'password');
    
    //     if (Auth::guard('web')->attempt($credentials, $request->boolean('remember'))) {
    //         $user = Auth::guard('web')->user();
    
    //         // ここでrole_idの判定（例: 一般ユーザーは role_id が 1 のみ許可）
    //         if ($user->role_id !== 1) {
    //             Auth::guard('web')->logout();
    
    //             return redirect()->route('login')->withErrors([
    //                 'email' => '一般ユーザー権限がありません。',
    //             ]);
    //         }
    
    //         $request->session()->regenerate();
    
    //         return redirect()->intended(route('mypage'));
    //     }
    
    //     // 認証失敗時
    //     return back()->withErrors([
    //         'email' => __('auth.failed'),
    //     ])->onlyInput('email');
    // }

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
