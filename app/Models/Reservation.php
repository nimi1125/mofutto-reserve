<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{

    protected $fillable = [
        'plushie_id',
        'course_id',
        'start_date',
        'postal_code',
        'address_line1',
        'address_line2',
        'phone_number',
        'completed_at',
    ];
    
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
    
    public function plushie()
    {
        return $this->belongsTo(\App\Models\Plushie::class);
    }
    
    public function course()
    {
        return $this->belongsTo(\App\Models\Course::class);
    }
}
