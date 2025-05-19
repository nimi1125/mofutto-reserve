<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'courses' => Course::all(),
        ]);
    }
}