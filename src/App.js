import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
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
        if(localStorage.getItem('jwtToken')) {
            try {
                const RES = await fetch(`https://spiderpremeclient.herokuapp.com/getRequest/${localStorage.getItem('username')}`)
                const RESJSON = await RES.json()
                if(RESJSON.error) this.setState({req: []})
                else this.setState({req: RESJSON})

            } catch(err) {
                console.log(err)
            }
        }
    }
    render() {
      const token = localStorage.getItem('jwtToken');
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' render={(props) =>  Auth.ISAUTH(token)  ? (<Main {...props} req={this.state.req} />) : (<Redirect to='/login' push/>)}/>
                <Route exact path='/reqForm' render={() =>  Auth.ISAUTH(token) ? (<Route component={ReqForm} />) : (<Redirect to='/login' push/>)}/>
                <Route exact path='/test/reqForm' component={ReqForm}/>
                <Route exact path='/test/main' component={Main}/>
                <Route exact path='/login' component={Login}/>
            </Switch>
        </BrowserRouter>
        )
  }
}

export default App;
