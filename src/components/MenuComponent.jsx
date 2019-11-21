import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import UseAnimations from 'react-useanimations';
import axios from 'axios';
const API_URL = global.apiUrl



class MenuComponent extends Component {
    addNewProject(event) {
        console.log("-----");
        return axios.post(`${API_URL}/createNew5star`).then(res => {
            console.log(res.data);
  
          })
    }
    
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <div  onClick={this.addNewProject} className="star5">
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