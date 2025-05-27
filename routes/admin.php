<?php

use App\Http\Controllers\Admin\AdminAuthenticatedSessionController;
use App\Http\Controllers\Admin\AdminConfirmablePasswordController;
use App\Http\Controllers\Admin\AdminEmailVerificationNotificationController;
use App\Http\Controllers\Admin\AdminEmailVerificationPromptController;
use App\Http\Controllers\Admin\AdminNewPasswordController;
use App\Http\Controllers\Admin\AdminPasswordController;
use App\Http\Controllers\Admin\AdminPasswordResetLinkController;
use App\Http\Controllers\Admin\AdminRegisteredUserController;
use App\Http\Controllers\Admin\AdminVerifyEmailController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware('guest:admin')->group(function () {
    Route::get('admin/register', [AdminRegisteredUserController::class, 'create'])->name('admin.register');

    Route::post('admin/register', [AdminRegisteredUserController::class, 'store']);

    Route::get('admin/login', [AdminAuthenticatedSessionController::class, 'create'])->name('admin.login');;

    Route::post('admin/login', [AdminAuthenticatedSessionController::class, 'store']);

    Route::get('admin/forgot-password', [AdminPasswordResetLinkController::class, 'create'])
        ->name('admin.password.request');

    Route::post('admin/forgot-password', [AdminPasswordResetLinkController::class, 'store'])
        ->name('admin.password.email');

    Route::get('admin/reset-password/{token}', [AdminNewPasswordController::class, 'create'])
        ->name('admin.password.reset');

    Route::post('admin/reset-password', [AdminNewPasswordController::class, 'store'])
        ->name('admin.password.store');
});

Route::middleware('auth:admin')->group(function () {
    
    Route::get('admin/verify-email', AdminEmailVerificationPromptController::class)
        ->name('admin.verification.notice');

    Route::get('admin/verify-email/{id}/{hash}', AdminVerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('admin.verification.verify');

    Route::post('admin/email/verification-notification', [AdminEmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('admin.verification.send');

    Route::get('admin/confirm-password', [AdminConfirmablePasswordController::class, 'show'])
        ->name('admin.password.confirm');

    Route::post('admin/confirm-password', [AdminConfirmablePasswordController::class, 'store']);

    Route::put('admin/password', [AdminPasswordController::class, 'update'])->name('admin.password.update');

    Route::post('admin/logout', [AdminAuthenticatedSessionController::class, 'destroy'])
        ->name('admin.logout');
    
});
