import React, {Component} from 'react';

const redirectToVK = () => {
  window.location.href = vk_url;
};


export default class LoginComponent extends Component {
    render() {
        return (
            <div>
                <Button/>
            </div>
        )
    }
}