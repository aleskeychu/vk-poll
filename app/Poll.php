<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    protected $fillable = ['title', 'is_multianswer', 'is_anonymous', 'user_id'];

    protected $hidden = ['updated_at'];

    public function options() {
        return $this->hasMany('App\Option');
    }
}
