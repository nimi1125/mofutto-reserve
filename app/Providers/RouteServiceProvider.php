<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define your route model bindings, pattern filters, etc.
     */
    public function boot(): void
    {
        parent::boot();

        $this->routes(function () {
            // web.php
            Route::middleware('web')
                ->group(base_path('routes/web.php'));

            // admin.php 
            Route::middleware('web')
                ->group(base_path('routes/admin.php'));

            // auth.php
            Route::middleware('auth')
                ->prefix('auth')
                ->group(base_path('routes/auth.php'));

            // console.php
            Route::middleware('console')
                ->prefix('console')
                ->group(base_path('routes/console.php'));
        });
    }
}
