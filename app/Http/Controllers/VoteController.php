<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vote;
use App\Option;
use App\Poll;
use App\User;
use Auth;
use Cache;
use Illuminate\Support\Facades\DB;

class VoteController extends Controller
{
    public const CACHE_TTL = 60 * 6;

    public function show(Request $request, $poll_id)
    {
        $data = $request->validate([
            'vote_id' => 'required|numeric'
        ]);
        $isAnonymous = Poll::find($poll_id)->first()->is_anonymous;
        if ($isAnonymous) {
            return response()->json(['error' => 'cant get voters of anonymous polls', 403]);
        }
        $vote_id = $data['vote_id'];
        $user_cache_ids = Cache::get(Vote::getVotesCacheKey($poll_id, $vote_id));
        if ($user_cache_ids === null) {
            $votes = Vote::where([
                ['poll_id', '=', $poll_id],
                ['vote_id', '=', $vote_id]
            ])->get()->toArray();
            $user_cache_ids = array_map(function($vote) {
                return User::getCacheKey($vote['user_id']);
            }, $votes);
            Cache::put(Vote::getVotesCacheKey($poll_id, $vote_id), $user_cache_ids, self::CACHE_TTL);
        }
        return array_values(User::fetchWithCache($user_cache_ids));
    }

    public function store(Request $request)
    {
        $validated_data = $request->validate([
            'poll_id' => 'required|numeric',
            'option_ids' => 'required|array',
        ]);
        $user_id = Auth::user()->id;
        $votes = Vote::where([
            ['poll_id', '=', $validated_data['poll_id']],
            ['user_id', '=', $user_id]
        ])->get()->toArray();
        if (!empty($votes)) {
            // user has already voted on this poll, return id of the option he has voted for
            return response()->json(['vote_ids' => $votes], 405);
        }
        $votes = array_map(function ($option_id) use ($validated_data, $user_id) {
            return new Vote([
                'poll_id' => $validated_data['poll_id'],
                'vote_id' => $option_id,
                'user_id' => $user_id
            ]);
        }, $validated_data['option_ids']);
        DB::transaction(function () use ($votes, $validated_data) {
            array_map(function ($vote) {
                DB::update(
                    'UPDATE options SET vote_count = vote_count + 1 WHERE poll_id = ? AND `index` = ?',
                    [$vote->poll_id, $vote->vote_id]
                );
                $vote->save();
            }, $votes);
        });
        Cache::forget(Vote::getVotedForCacheKey($user_id, $validated_data['poll_id']));
        Cache::forget(Option::getCacheKey($validated_data['poll_id']));
        foreach ($validated_data['option_ids'] as $id) {
            Cache::forget(Vote::getVotesCacheKey($validated_data['poll_id'], $id));
        }
        return response()->json(['success' => 'success']);
    }

    public function destroy($poll_id)
    {
        $user_id = Auth::user()->id;
        $poll = Poll::find($poll_id);
        if ($poll === null) {
            return response()->json(['error' => 'invalid poll id'], 403);
        }
        $votes = Vote::where([
            ['user_id', '=', $user_id],
            ['poll_id', '=', $poll_id]
        ])->get()->toArray();

        DB::transaction(function () use ($votes) {
            array_map(function ($vote) {
                DB::update(
                    'UPDATE options SET vote_count = vote_count - 1 WHERE poll_id = ? AND `index` = ?',
                    [$vote['poll_id'], $vote['vote_id']]
                );
                DB::delete(
                    'DELETE FROM votes WHERE poll_id = ? AND vote_id = ?',
                    [$vote['poll_id'], $vote['vote_id']]
                );
            }, $votes);
        });
        Cache::forget(Vote::getVotedForCacheKey($user_id, $poll_id));
        Cache::forget(Option::getCacheKey($poll_id)); // to fetch vote count again
        foreach ($votes as $vote) {
            Cache::forget(Vote::getVotesCacheKey($poll_id, $vote['vote_id']));
        }
        return response()->json(['success' => 'success']);
    }
}
