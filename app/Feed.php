<?php
/**
 * Created by PhpStorm.
 * User: alekseychu
 * Date: 30/10/2018
 * Time: 10:43
 */

namespace App;

use Cache;

class Feed
{
    const CACHE_TTL = 60 * 6;

    public static function invalidateCacheForFeed() {
        if (Cache::has('feed_version')) {
            Cache::increment('feed_version');
        } else {
            Cache::put('feed_version', 1, self::CACHE_TTL);
        }
    }
}