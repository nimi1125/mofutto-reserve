<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlushieStatus extends Model
{
    public function Plushie()
    {
        return $this->hasMany(\App\Models\Plushie::class);
    }
}
