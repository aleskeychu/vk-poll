<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poll extends Model
{
    protected $fillable = ['title', 'is_multianswer', 'is_anonymous', 'user_id'];
}
