import React, { Component } from 'react';
import ListCoursesComponent from './service/ListCoursesComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './components/LoginComponent';
import LogoutComponent from './components/LogoutComponent';
import MenuComponent from './components/MenuComponent';
import AuthenticationService from './service/AuthenticationService';
import AuthenticatedRoute from './service/AuthenticatedRoute';

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
                            <AuthenticatedRoute path="/courses" exact component={ListCoursesComponent} />
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default InstructorApp