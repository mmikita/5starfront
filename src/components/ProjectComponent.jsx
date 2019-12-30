import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import UseAnimations from 'react-useanimations';
import axios from 'axios';
import Sidebar from './sidebar'
import Content from './content.jsx'

const API_URL = global.apiUrl

class ProjectComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            star5ProjectStatues: [],
            logoImage: 'logoimg',
            uuid: '',
            name: '',
            contractId: '',
            URL: ''
        }
        this.addNewProject = this.addNewProject.bind(this)
        this.createOrEditProject = this.createOrEditProject.bind(this)


    }
    createOrEditProject(name, number, url){
    
        console.log(name +"|" + number + "|"+url);
        axios.post(`${API_URL}/addNew5star`, { name: name,
            statues: this.state.star5ProjectStatues, uuid: this.state.uuid, contractNumber: number,URL: url,userName: localStorage.getItem('authenticatedUser')})
        .then(res => {
          console.log(res.data);
        })
   
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
        return axios.post(`${API_URL}/createNew5star`).then(res => {
        this.setState({ logoImage: 'logoimgwith5star' });
        this.setState({ uuid: res.data.uuid  });
        this.setState({ star5ProjectStatues: res.data.statues  });

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
                    <Content start5={this.state.star5ProjectStatues} logo={this.state.logoImage} saveProject={this.createOrEditProject} />
                </div>
            </React.Fragment>
        )
    }
  
}

export default withRouter(ProjectComponent)