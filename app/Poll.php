<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    protected $fillable = ['title', 'is_multianswer', 'is_anonymous', 'user_id'];

    protected $hidden = ['updated_at'];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function options() {
        return $this->hasMany('App\Option');
    }

    public function votes() {
        return $this->hasMany('App\Vote');
    }
}
