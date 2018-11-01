<?php
/**
 * Created by PhpStorm.
 * User: alekseychu
 * Date: 24/10/2018
 * Time: 18:59
 */

namespace App\Http\Controllers;

use App\Feed;
use App\Poll;
use App\Option;
use Illuminate\Http\Request;
use Auth;
use Cache;
use Illuminate\Support\Facades\DB;

class PollController extends Controller
{
    /*
     * If $request contains isMultianswer and isAnonymous fields, then its creation
     * If $request contains id field, then its an update TODO change to a different rest method
     *
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|filled',
            'options' => 'required|array',
            'isMultianswer' => 'required|boolean',
            'isAnonymous' => 'required|boolean',
        ]);
        $userId = Auth::user()->id;
        $poll = new Poll([
            'title' => $data['title'],
            'is_multianswer' => $data['isMultianswer'],
            'is_anonymous' => $data['isAnonymous'],
            'user_id' => $userId
        ]);
        DB::transaction(function () use ($poll, $data) {
            $poll->save();
            $options = array_map(function ($text, $idx) use ($poll) {
                return [
                    'index' => $idx,
                    'text' => $text,
                    'poll_id' => $poll->id
                ];
            },
                $data['options'],
                array_keys($data['options'])
            );
            Option::insert($options);
        });
        Feed::invalidateCacheForFeed();
        return response()->json(['success' => 'success'], 200);
    }

    public function update(Request $request, $id)
    {
        $user_id = Auth::user()->id;
        $poll = Poll::find($id);
        if ($poll === null || $poll->user_id != $user_id) {
            return response()->json(['error' => 'invalid poll id'], 403);
        }
        $data = $request->validate([
            'title' => 'required|string|filled',
            'options' => 'required|array',
        ]);
        $indices = array_map(function ($option) {
            return $option['index'];
        }, $data['options']);

        DB::transaction(function () use ($data, $indices, $id, $poll) {
            Option::where([
                ['poll_id', '=', $id],
            ])->whereNotIn('index', $indices)->delete();

            array_map(function ($option) use ($id) {
                $result = Option::where([
                    ['poll_id', '=', $id],
                    ['index', '=', $option['index']]
                ])->first();
                if ($result === null) {
                    $opt = new Option([
                        'poll_id' => $id,
                        'index' => $option['index'],
                        'text' => $option['text'],
                        'vote_count' => 0
                    ]);
                    $opt->save();
                } else {
                    DB::update(
                        "UPDATE options SET text = ? WHERE poll_id = ? AND `index` = ?",
                        [$option['text'], $id, $option['index']]
                    );
                }
            }, $data['options']);
            $poll->title = $data['title'];
            $poll->save();
        });
        Feed::invalidateCacheForFeed();
        return response()->json(['success' => 'success']);
    }

    public function destroy($id)
    {
        $user_id = Auth::user()->id;
        $poll = Poll::find($id);
        if ($poll === null || $poll->user_id != $user_id) {
            return response()->json(['error' => 'invalid poll id'], 403);
        }
        $poll->delete();
        Feed::invalidateCacheForFeed();
        return response()->json(['poll_id' => $poll->id]);
    }
}