import React, {Component} from 'react'
import Login from "./Login";


class LoginPage extends  Component {
    render() {
        return (
            <div className='widget-page'>
                <h3>Welcome to Spiderpreme 🕷</h3>
                <Login/>
            </div>
        )
    }
}

export default LoginPage;