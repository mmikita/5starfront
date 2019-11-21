import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import UseAnimations from 'react-useanimations';

class MenuComponent extends Component {

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <div className="star5">
      {isUserLoggedIn && <UseAnimations animationKey="star" size={32} style={{ padding: 0 }}/>}
      </div>
      <div className="separator"></div>
                <div className="login">
                    {isUserLoggedIn && <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Wyloguj</Link>}
                </div>
            </header>
        )
    }
}

export default withRouter(MenuComponent)