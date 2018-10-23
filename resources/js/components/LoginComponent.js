import React, {Component} from 'react';
import {Button} from 'reactstrap';

//TODO change client_id to real id
const vk_url = 'https://oauth.vk.com/authorize?client_id=6727304&redirect_uri=http://localhost:8000/vkcallback';

const redirectToVK = () => {
  window.location.href = vk_url;
};


export default class LoginComponent extends Component {
    render() {
        return (
            <div>
                <Button onClick={redirectToVK}/>
            </div>
        )
    }
}