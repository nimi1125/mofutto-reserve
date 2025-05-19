<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ReserveController;
use App\Http\Controllers\HomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'],function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/mypage', function () {
    return Inertia::render('Mypage');
})->middleware(['auth', 'verified'])->name('mypage');


Route::get('/reserve/course', [CourseController::class, 'index'])->name('reserveCourse');
Route::get('/reserve/calendar/{courseId}', [ReserveController::class, 'showCalendar'])->name('ReserveCalendar');
Route::get('/reserve/form', [ReserveController::class, 'create'])->name('reserveForm');
Route::post('/reserve/form', [ReserveController::class, 'store'])->name('reservations.store');
Route::get('/reserve/historyList', [ReserveController::class, 'myReserve'])->name('reserveHistoryList');
Route::delete('/reserve/historyList/{reservationId}', [ReserveController::class, 'destroy'])->name('reserveDestroy');
Route::get('/reserve/update/{reservation}', [ReserveController::class, 'edit'])->name('reserveEdit');
Route::put('/reserve/update/{reservation}', [ReserveController::class, 'update'])->name('reserve.update');

Route::get('/status', function () {
    return Inertia::render('status');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
