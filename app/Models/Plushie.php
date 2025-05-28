<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plushie extends Model
{
    protected $fillable = ['name','status_id'];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function status()
    {
        return $this->belongsTo(\App\Models\PlushieStatus::class, 'status_id');
    }

    public function reservation()
    {
        return $this->hasMany(\App\Models\Reservation::class);
    }
}
