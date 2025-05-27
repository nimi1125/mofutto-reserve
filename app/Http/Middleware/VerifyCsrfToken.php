<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    // デバッグ用に特定ルートだけCSRFチェックを除外
    protected $except = [
        'login',
    ];
}
