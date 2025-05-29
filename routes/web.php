<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminPageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [HomeController::class, 'index'],function () {
    return Inertia::render('User/Mypage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/mypage', function () {
    return Inertia::render('User/Mypage');
})->middleware(['auth', 'verified'])->name('mypage');

Route::get('/reservation/course', [CourseController::class, 'index'])
    ->name('reservation.course');

Route::get('/reservation/calendar/{courseId}', [ReservationController::class, 'showCalendar'])
    ->middleware('auth')
    ->name('reservation.calendar');

Route::get('/reservation/form', [ReservationController::class, 'create'])
    ->name('reservation.form');

Route::post('/reservation/form', [ReservationController::class, 'store'])
    ->name('reservations.store');

Route::get('/reservation/list', [ReservationController::class, 'myReserve'])
    ->name('reservations');

Route::delete('/reservation/list/{reservationId}', [ReservationController::class, 'destroy'])
    ->name('reservation.destroy');

Route::get('/reservation/update/{reservation}', [ReservationController::class, 'edit'])
    ->name('reservation.edit');

Route::put('/reservation/update/{reservation}', [ReservationController::class, 'update'])
    ->name('reservation.update');

Route::middleware('web')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
    ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
    ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
    ->name('profile.destroy');

});

Route::middleware('auth:admin')->group(function () {
    Route::get('admin/dashboard', [AdminPageController::class, 'index'])
    ->name('admin.dashboard');

    Route::get('admin/reservation/list', [AdminPageController::class, 'reserveList'])
    ->name('admin.reservations');
    
    Route::post('admin/reservation/list', [AdminPageController::class, 'bulkUpdate'])
    ->name('admin.reservations.bulkUpdate');

    Route::get('admin/reservation/detail/{reservation}', [AdminPageController::class, 'showReserve'])
    ->name('admin.reservation.show');

    Route::put('admin/reservation/detail/{reservation}', [AdminPageController::class, 'updateReserve'])
    ->name('admin.reservation.update');

    Route::delete('admin/reservation/detail/{reservation}', [AdminPageController::class, 'destroy'])
    ->name('admin.reservation.destroy');

    Route::get('admin/profile', [AdminProfileController::class, 'edit'])
    ->name('admin.profile.edit');
    
    Route::patch('admin/profile', [AdminProfileController::class, 'update'])
    ->name('admin.profile.update');
    
    Route::delete('admin/profile', [AdminProfileController::class, 'destroy'])
    ->name('admin.profile.destroy');
    
});

require __DIR__.'/auth.php';
