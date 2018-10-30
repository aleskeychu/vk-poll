<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cache;
use Auth;

class Vote extends Model
{
    public const CACHE_TTL = 60 * 6;

    protected $fillable = [
        'poll_id', 'vote_id', 'user_id'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function user() {
        return $this->hasOne('App\User');
    }

    public static function fetchVotedForWithCache($cache_ids) {
        $userId = Auth::user()->id;
        $voted_for_arr = Cache::many($cache_ids);
        $voted_for_not_in_cache = array_filter(array_values(array_map(function ($voted_for, $key) {
            if ($voted_for === null) {
                return Vote::votedForCacheKeyToPollId($key);
            }
            return null;
        }, $voted_for_arr, array_keys($voted_for_arr))));
        $voted_for_not_in_cache_ids_as_keys = array_fill_keys($voted_for_not_in_cache, null);
        $voted_for_not_in_cache_with_cache_keys = [];
        foreach ($voted_for_not_in_cache_ids_as_keys as $key => $value) {
            $votes = Vote::select('vote_id')->where([
                ['poll_id', '=', $key],
                ['user_id', '=', $userId]
            ])->get()->toArray();
            $vote_ids = array_map(function ($vote) {
                return $vote['vote_id'];
            }, $votes);
            $voted_for_not_in_cache_with_cache_keys[Vote::getVotedForCacheKey($userId, $key)]
                = $vote_ids;
        }
        Cache::put($voted_for_not_in_cache_with_cache_keys, self::CACHE_TTL);
        return array_merge($voted_for_arr, $voted_for_not_in_cache_with_cache_keys);
    }

    public static function getVotedForCacheKey($user_id, $poll_id) {
        return $user_id . '_voted_for_' . $poll_id;
    }

    public static function votedForCacheKeyToPollId($key) {
        $idx = strrpos($key, '_');
        return intval(substr($key, $idx + 1), 10);
    }

    public static function getVotesCacheKey($poll_id, $option_id) {
        return 'votes_for_'.$poll_id.'_'.$option_id;
    }
}
