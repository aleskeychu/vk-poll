<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Poll;

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
            $polls = Poll::orderBy('created_at', 'desc')->take($amount)->get();
        } else {
            $mark = Poll::find($data['poll_id']);
            $polls = Poll::where('created_at', '<', $mark->created_at)->order_by('created_at', 'desc')->take($amount)->get();
        }

        $poll_ids = array_map(function ($poll) {
            return $poll->id;
        }, $polls);

        return response()->json($polls);
    }
}
