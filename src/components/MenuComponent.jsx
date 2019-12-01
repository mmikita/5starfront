import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import UseAnimations from 'react-useanimations';
import axios from 'axios';
import Sidebar from './sidebar'
import Content from './content.jsx'
import logo from  '../resources/img/5StarWeb_logo.png'

const API_URL = global.apiUrl

class MenuComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            star5Project: [],
            logoImage: 'logoimg'
        }
        this.addNewProject = this.addNewProject.bind(this)

    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }
    addNewProject(event) {
        console.log("-----");
        return axios.post(`${API_URL}/createNew5star`).then(res => {
            this.setState({ logoImage: 'logoimgwith5star' });
             var elements = res.data.statues;
             console.log(elements);

              this.setState({ star5Project: elements  });

        })
    }
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <React.Fragment>
                <header>
                    <div onClick={this.addNewProject} className="star5">
                        {isUserLoggedIn && <UseAnimations animationKey="star" size={32} style={{ padding: 0 }} />}
                    </div>
                    <div className="separator"></div>
                    <div className="login">
                        {isUserLoggedIn && <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Wyloguj</Link>}
                    </div>
                </header>
                <div className="content">
                    <Sidebar />
                    <Content start5={this.state.star5Project} logo={this.state.logoImage} />
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(MenuComponent)