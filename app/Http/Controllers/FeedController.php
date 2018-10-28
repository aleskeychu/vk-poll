<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Poll;
use Auth;

class FeedController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate([
            'poll_id' => 'numeric',
            'amount' => 'numeric',
        ]);
        $amount = $data['amount'] ?? 20;
        if (!isset($data['poll_id'])) {
            $polls = Poll::orderBy('created_at', 'desc')->take($amount)->with('user')->with('options')->with('votes')->get();
        } else {
            $mark = Poll::find($data['poll_id']);
            $polls = Poll::where('created_at', '<', $mark->created_at)->order_by('created_at', 'desc')
                ->take($amount)->with('options')->get();
        }
        $polls = $this->addFieldUserVoted($polls->toArray());
        $polls = $this->filterForAnonymous($polls);
        $polls = $this->unsetVotesField($polls);
        return response()->json($polls);
    }

    private function addFieldUserVoted($polls)
    {
        $userId = Auth::user()->id;
        return array_map(function ($poll) use ($userId) {
            $votes = array_filter($poll['votes'], function ($vote) use ($userId) {
                return $vote['user_id'] === $userId;
            });
            $poll['userVotedFor'] = array_map(function ($vote) {
                return $vote['vote_id'];
            }, $votes);
            return $poll;
        }, $polls);
    }

    private function filterForAnonymous($polls)
    {
        return array_map(function ($poll) {
            if ($poll['is_anonymous']) {
                $poll['votes'] = [];
            }
            return $poll;
        }, $polls);
    }

    private function unsetVotesField($polls)
    {
        return array_map(function ($poll) {
            unset($poll['votes']);
            return $poll;
        }, $polls);
    }
}
