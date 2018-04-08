import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Main from './components/Main'
import * as Auth from './Modules/Auth'
import './App.css';
import LoginPage from "./components/LoginPage";
import ReqPage from "./components/ReqPage";

class App extends Component {
  render() {
      const token = localStorage.getItem('jwtToken');
      console.log(Auth.ISAUTH(`JWTToken: ${token}`))
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' render={() => ( Auth.ISAUTH(token) ) ? (<Route component={Main} />) : (<Redirect to='/login' push/>)}/>
                <Route exact path='/reqForm' render={() => ( Auth.ISAUTH(token) ) ? (<Route component={ReqPage} />) : (<Redirect to='/login' push/>)}/>
                <Route exact path='/test/reqForm' component={ReqPage}/>
                <Route exact path='/test/main' component={Main}/>
                <Route exact path='/login' component={LoginPage}/>
            </Switch>
        </BrowserRouter>
        )
  }
}

export default App;
