<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Cache;

class User extends Authenticatable
{
    public const CACHE_TTL = 60 * 6;

    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'vk_access_token', 'vk_expires_in', 'created_at', 'updated_at', 'remember_token'
    ];

    public static function fetchWithCache($cache_ids) {
        $cache_ids_as_keys = array_fill_keys($cache_ids, null); // filter duplicate keys
        $users = Cache::many($cache_ids_as_keys);
        $users_not_in_cache = array_filter(array_values(array_map(function ($user, $key) {
            if ($user === null) {
                return User::cacheKeyToId($key);
            }
            return null;
        }, $users, array_keys($users))));
        $users_not_in_cache_ids_as_keys = array_fill_keys($users_not_in_cache, null);
        $users_not_in_cache_with_cache_keys = [];
        foreach ($users_not_in_cache_ids_as_keys as $key => $value) {
            $iter_user = User::find($key);
            $users_not_in_cache_with_cache_keys[User::getCacheKey($key)] = array(
                'id' => $iter_user->id,
                'first_name' => $iter_user->first_name,
                'second_name' => $iter_user->second_name,
                'domain' => $iter_user->domain,
                'image_50' => $iter_user->image_50
            );
        }
        Cache::put($users_not_in_cache_with_cache_keys, self::CACHE_TTL);
        return array_merge($users, $users_not_in_cache_with_cache_keys);
    }

    public static function getCacheKey($user_id)
    {
        return 'user_' . $user_id;
    }

    public static function cacheKeyToId($key)
    {
        return intval(substr($key, 5), 10); // cutting 'user_' from the key
    }
}
