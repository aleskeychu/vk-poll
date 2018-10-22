<?php

namespace App\Http\Controllers;

use App\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use JWTAuth;

class VkOAuthCallbackController extends \Illuminate\Routing\Controller
{

    CONST API_VERSION = '5.87';

    public function index(Request $request)
    {
        $code = $request->input('code');
        if ($code === null) {
            $error = $request->input('error');
            $error_description = $request->input('error-description');
            $this->handleError($error, $error_description);
            return; // TODO Return something more useful
        }
        $client = new Client();
        $response = $client->request('GET', $this->getUrlForAccessToken($code));
        if ($response->getStatusCode() === 200) {
            $result = json_decode($response->getBody());
            $access_token = $result->access_token;
            $expires_in = $result->expires_in;
            $user_id=$result->user_id;
            $user = User::find($user_id);
            if ($user === null) {
                $response = $client->request('GET', $this->getUrlForUserInfo($access_token));
                if ($response->getStatusCode() === 200) {
                    $result = json_decode($response->getBody());
                    $user = new User();
                    $user->first_name = $result->first_name;
                    $user->second_name = $result->second_name;
                    $user->domain = $result->domain;
                    $response = $client->request('GET', $result->photo50);
                    $user->image50 = $response->getBody()->getContents();
                    $user->vk_access_token = $access_token;
                    $user->vk_expires_in = $access_token;

                }
                // TODO
            }
        }

    }

    private function handleError($error, $error_description)
    {

    }

    private function getUrlForAccessToken($code)
    {
        $url = 'https://oauth.vk.com/access_token?'
            . 'client_id=' . env('VK_CLIENT_ID')
            . '&client_secret=' . env('VK_CLIENT_SECRET')
            . '&redirect_uri=' . env('VK_REDIRECT_URI')
            . '&code=' . $code;
        return $url;
    }

    private function getUrlForUserInfo($access_token) {
        $url = "https://api.vk.com/method/users.get?"
            . 'fields=photo50,domain'
            . '&access_token=' . $access_token
            . '&v=' . $this::API_VERSION;
        return $url;
    }
}