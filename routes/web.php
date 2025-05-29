<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ReserveController;
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

Route::get('/reserve/course', [CourseController::class, 'index'])
    ->name('reserve.course');

Route::get('/reserve/calendar/{courseId}', [ReserveController::class, 'showCalendar'])
    ->middleware('auth')
    ->name('reserve.calendar');

Route::get('/reserve/form', [ReserveController::class, 'create'])
    ->name('reserve.form');

Route::post('/reserve/form', [ReserveController::class, 'store'])
    ->name('reservations.store');

Route::get('/reservation/list', [ReserveController::class, 'myReserve'])
    ->name('reservations');

Route::delete('/reservation/list/{reservationId}', [ReserveController::class, 'destroy'])
    ->name('reserve.destroy');

Route::get('/reserve/update/{reservation}', [ReserveController::class, 'edit'])
    ->name('reserve.edit');

Route::put('/reserve/update/{reservation}', [ReserveController::class, 'update'])
    ->name('reserve.update');

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
