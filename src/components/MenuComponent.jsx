import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import UseAnimations from 'react-useanimations';
import axios from 'axios';
import Sidebar from './sidebar'
import Content from './content.jsx'
const API_URL = global.apiUrl

class MenuComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            star5Project: []
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
            console.log(res.data);
            this.setState({ star5Project: JSON.stringify(res.data)  })
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
                    <Content start5={this.state.star5Project} />
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(MenuComponent)