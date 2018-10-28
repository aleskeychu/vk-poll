<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Vote;
use App\Option;
use App\Poll;
use Auth;
use Illuminate\Support\Facades\DB;

class VoteController extends Controller
{
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
        return response()->json(['success' => 'success']);
    }

    public function destroy($poll_id) {
        $user_id = Auth::user()->id;
        $poll = Poll::find($poll_id);
        if ($poll === null || $poll->user_id !== $user_id) {
            return response()->json(['error' => 'invalid poll id'], 403);
        }
        $votes = Vote::where([
            ['user_id', '=', $user_id],
            ['poll_id', '=', $poll_id]
        ])->get();

        DB::transaction(function() use ($votes){
            array_map(function($vote) {
                DB::update(
                    'UPDATE options SET vote_count = vote_count - 1 WHERE poll_id = ? AND `index` = ?',
                    [$vote['poll_id'], $vote['vote_id']]
                );
                DB::delete(
                    'DELETE FROM votes WHERE poll_id = ? AND vote_id = ?',
                    [$vote['poll_id'], $vote['vote_id']]
                );
            }, $votes->toArray());

        });
        return response()->json(['success' => 'success']);
    }
}
