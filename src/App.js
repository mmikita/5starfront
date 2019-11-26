import React, { Component } from 'react';
import Main from './components/main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import LogoutComponent from './components/LogoutComponent';
import AuthenticatedRoute from './service/AuthenticatedRoute';
import './App.css';


class InstructorApp extends Component {


    render() {
        return (
            <>
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" exact component={LoginComponent} />
                            <Route path="/register" exact component={RegisterComponent} />
                            <AuthenticatedRoute path="/logout" exact component={LogoutComponent} />
                            <AuthenticatedRoute path="/5starflow" exact component={Main} />
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default InstructorApp