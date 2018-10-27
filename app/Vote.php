<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = [
        'poll_id', 'vote_id', 'user_id'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function user() {
        return $this->hasOne('App\User');
    }
}
