<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Poll;
use Auth;
use Cache;
use App\Vote;
use App\Option;
use App\User;

class FeedController extends Controller
{
    const DEFAULT_POLL_BATCH_SIZE = 10;
    const CACHE_TTL = 60 * 4;

    public function index(Request $request)
    {
        $data = $request->validate([
            'poll_id' => 'numeric']);
        $amount = $this::DEFAULT_POLL_BATCH_SIZE;
        if (!isset($data['poll_id'])) {
            $version = Cache::get('feed_version', 0);
            $polls = Cache::get('feed_' . $version);
            if ($polls === null) {
                $polls = Poll::orderBy('created_at', 'desc')->take($amount)->get()->toArray();
                Cache::put('feed_' . $version, $polls, $this::CACHE_TTL);
            }
        } else {
            $mark = Poll::find($data['poll_id']);
            $polls = Poll::where('created_at', '<', $mark->created_at)->orderBy('created_at', 'desc')
                ->take($amount)->get()->toArray();
        }
        $polls = $this->fillOptionsSubarray($polls);
        $polls = $this->fillUserVotedFor($polls);
        $polls = $this->fillUserArray($polls);

        return response()->json($polls);
    }

    private function fillOptionsSubarray($polls)
    {
        $option_cache_ids = array_map(function ($poll) {
            return Option::getCacheKey($poll['id']);
        }, $polls);
        $options = Option::fetchWithCache($option_cache_ids);
        return array_map(function ($poll) use ($options) {
            $option = array_filter($options, function ($key) use ($poll) {
                return Option::cacheKeyToPollId($key) === $poll['id'];
            }, ARRAY_FILTER_USE_KEY);
            // array_filter sets null for other keys, use array_values to have array of one element
            $poll['options'] = array_values($option)[0];
            return $poll;
        }, $polls);
    }

    private function fillUserVotedFor($polls)
    {
        $userId = Auth::user()->id;
        $cache_ids = array_map(function ($poll) use ($userId) {
            return Vote::getVotedForCacheKey($userId, $poll['id']);
        }, $polls);
        $voted_for_arr = Vote::fetchVotedForWithCache($cache_ids);
        return array_map(function ($poll) use ($voted_for_arr) {
            $voted_for_element = array_filter($voted_for_arr, function ($key) use ($poll) {
                return Vote::votedForCacheKeyToPollId($key) === $poll['id'];
            }, ARRAY_FILTER_USE_KEY);
            // array_filter sets null for other keys, use array_values to have array of one element
            $poll['userVotedFor'] = array_values($voted_for_element)[0];
            return $poll;
        }, $polls);
    }

    private function fillUserArray($polls)
    {
        $cache_ids = array_map(function ($poll) {
            return User::getCacheKey($poll['user_id']);
        }, $polls);
        $users = User::fetchWithCache($cache_ids);
        return array_map(function ($poll) use ($users) {
            $user = array_filter($users, function ($key) use ($poll) {
                return User::cacheKeyToId($key) === $poll['user_id'];
            }, ARRAY_FILTER_USE_KEY);
            // array_filter sets null for other keys, use array_values to have array of one element
            $poll['user'] = array_values($user)[0];
            return $poll;
        }, $polls);
    }
}
