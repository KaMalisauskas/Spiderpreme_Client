import React, {Component} from 'react'
import {Icon} from 'antd'
import * as Auth from '../Modules/Auth'

class LogoutButton extends Component {
    render() {
        return (
            <div className='LogoutButton'>
                <a href='/' >
                  <p><Icon type="logout" /> Logout</p>
                </a>
            </div>
        )
    }
}

export default LogoutButton