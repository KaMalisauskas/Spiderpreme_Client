import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Icon} from 'antd'
import Main from './components/Main'
import * as Auth from './Modules/Auth'
import './App.css';
import Login from "./components/Login";
import ReqForm from "./components/ReqForm";

class App extends Component {
    state = {
        req: ''
    }

    async componentDidMount() {
        try{
            const RES = await fetch(`https://spiderpremeclient.herokuapp.com/getRequest/${localStorage.getItem('username')}`)

            const RESJSON = await RES.json()

            this.setState({
                req: RESJSON
            })

        } catch (err) {
            console.error(err)
        }
    }

    render() {

      const token = localStorage.getItem('jwtToken');
      console.log(token)
    return (
        <BrowserRouter>

            <Switch>
                <Route path='/' render={ props => {
                    if(token){
                        if(this.state.req.success) return <Main {...props}/>
                        else return <ReqForm {...props}/>
                    } else return <Login {...props}/>
                }} />


            </Switch>
        </BrowserRouter>
        )
  }
}

export default App;
