<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $fillable = ['index', 'text'];

    public function votes() {
        return $this->hasMany('App\Vote');
    }
}
