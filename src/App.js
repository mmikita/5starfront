import React, { Component } from 'react';
import Main from './components/main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './components/LoginComponent';
import LogoutComponent from './components/LogoutComponent';
import MenuComponent from './components/MenuComponent';
import AuthenticatedRoute from './service/AuthenticatedRoute';
import './App.css';


class InstructorApp extends Component {


    render() {
        return (
            <>
                <Router>
                    <>
                        <MenuComponent />
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" exact component={LoginComponent} />
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