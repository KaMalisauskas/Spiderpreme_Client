import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Main from './components/Main'
import * as Auth from './Modules/Auth'
import './App.css';
import Login from "./components/Login";
import ReqForm from "./components/ReqForm";

class App extends Component {

    render() {
      const token = localStorage.getItem('jwtToken');
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact path='/'
                    render={(props) =>  Auth.ISAUTH(token)  ? (<Main {...props}  />) : (<Redirect to='/login' push/>)}
                />
                <Route
                    exact path='/reqForm'
                    render={(props) =>  Auth.ISAUTH(token) ? (<ReqForm {...props} />) : (<Redirect to='/login' push/>)}
                />
                <Route
                    exact path='/login'
                    render={(props) => <Login {...props}  />}
                />
            </Switch>
        </BrowserRouter>
        )
  }
}

export default App;
