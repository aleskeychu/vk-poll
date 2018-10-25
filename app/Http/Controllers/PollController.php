<?php
/**
 * Created by PhpStorm.
 * User: alekseychu
 * Date: 24/10/2018
 * Time: 18:59
 */

namespace App\Http\Controllers;


use App\Poll;
use App\Option;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\DB;

class PollController extends Controller
{

    /*
     * If $request contains isMultianswer and isAnonymous fields, then its creation
     * If $request contains id field, then its an update
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
        error_log(print_r($data, true));
        $userId = Auth::user()->id;
        $poll = new Poll([
            'title' => $data['title'],
            'is_multianswer' => $data['isMultianswer'],
            'is_anonymous' => $data['isAnonymous'],
            'user_id' => $userId
        ]);
        $options = array_map(function ($text, $idx) {
            return new Option([
                'index' => $idx,
                'text' => $text,
            ]);
        },
            $data['options'],
            array_keys($data['options'])
        );
        DB::transaction(function () use ($poll, $options) {
            $poll->save();
            array_map(function ($option) use ($poll) {
                $option->poll_id = $poll->id;
                $option->save();
            },
                $options
            );
        });
        return response()->json(['success' => 'success'], 200);
    }

    public function update(Request $request)
    {

    }

    public function destroy(Request $request)
    {

    }
}