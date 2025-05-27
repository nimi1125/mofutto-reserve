<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\ValidationException;

class AdminAuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/AdminLogin', [
            'type' => 'admin',
            'canResetPassword' => Route::has('admin.password.request'),
            'status' => session('status'),
        ]);
    }


    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
    
        if (Auth::guard('admin')->attempt($credentials)) {
            $user = Auth::guard('admin')->user();
    
            if ($user->role_id !== 2) {
                Auth::guard('admin')->logout();
                return redirect()->route('admin.login')->withErrors([
                    'email' => '管理者権限がありません。',
                ]);
            }
    
            $request->session()->regenerate();
    
            return redirect()->intended(route('admin.dashboard'));
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
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return redirect('/admin/login');
    }
}