import React, {Component} from 'react';
import {Button, Icon} from 'antd';
import * as Auth from '../Modules/Auth'

class Main extends Component {

    state = {
        url: '',
        keyword: '',
        loading: true
    }

    Logout() {
        Auth.DEAUTHENTICATE()
        window.location.reload()
    }

    async deleteReq() {
        try{
            const RES = await fetch(`https://spiderpremeclient.herokuapp.com/deleteRequest`, {
                method: 'DELETE',
                body: JSON.stringify({
                    username: localStorage.getItem('username')
                }),
                headers: {
                    "content-type": "application/json"
                },
            })

            const RESJSON = await RES.json()

            window.location.reload()

        } catch(err) {

            console.error(err)

        }
    }

    async componentDidMount() {
        try{
            const RES = await fetch(`https://spiderpremeclient.herokuapp.com/getRequest/${localStorage.getItem('username')}`)

            const RESJSON = await RES.json()

            if(!RESJSON.success) {

                this.props.history.push('/reqForm')

            } else {

                this.setState({
                    url: RESJSON.data[0].url,
                    keyword: RESJSON.data[0].keyword
                })

                this.setState({
                    loading: false
                })

            }
        } catch (err) {

            console.error(err)

        }

    }

    render() {
        return(
            <div className='widget-page'>
                <p className='LogoutButton' onClick={this.Logout}><Icon type="logout" /> Logout</p>
                <h2>Your current Lookout  🔍!</h2>
                <h3>Url</h3>
                <a href={this.state.url}>{this.state.url}</a>
                <h3>Keyword</h3>
                <p>{this.state.keyword}</p>
                <Button className='buttonRight login-form-button' loading={this.state.loading} type="danger" onClick={this.deleteReq.bind(this)}><Icon type="meh" />Delete</Button>
            </div>
        )
    }
}


export default Main