<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $fillable = ['index', 'text', 'poll_id', 'vote_count'];

    protected $hidden = ['created_at', 'updated_at', 'poll_id'];

    public function votes() {
        return $this->hasMany('App\Vote');
    }
}
