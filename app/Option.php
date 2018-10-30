<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cache;

class Option extends Model
{
    public const CACHE_TTL = 60 * 6;

    protected $fillable = ['index', 'text', 'poll_id', 'vote_count'];

    protected $hidden = ['created_at', 'updated_at', 'poll_id'];

    public function votes() {
        return $this->hasMany('App\Vote');
    }

    public static function fetchWithCache($cache_ids) {
        $options = Cache::many($cache_ids);
        $options_not_in_cache = array_filter(array_values(array_map(function ($option, $key) {
            if ($option === null) return Option::cacheKeyToPollId($key);
            return null;
        }, $options, array_keys($options))));
        $options_not_in_cache_ids_as_keys = array_fill_keys($options_not_in_cache, null);
        $options_not_in_cache_with_cache_keys = [];
        foreach ($options_not_in_cache_ids_as_keys as $key => $value) {
            $options_not_in_cache_with_cache_keys[Option::getCacheKey($key)]
                = Option::where('poll_id', '=', $key)->get()->toArray();
        }
        Cache::put($options_not_in_cache_with_cache_keys, self::CACHE_TTL);
        return array_merge($options, $options_not_in_cache_with_cache_keys);
    }

    public static function getCacheKey($poll_id) {
        return 'options_' . $poll_id;
    }

    public static function cacheKeyToPollId($key) {
        return intval(substr($key, 8), 10); // cutting 'options_' from the key
    }
}
