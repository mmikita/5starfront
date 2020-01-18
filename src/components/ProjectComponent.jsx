import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import UseAnimations from 'react-useanimations';
import axios from 'axios';
import Sidebar from './sidebar'
import Content from './content.jsx'
import $ from 'jquery';


const API_URL = global.apiUrl

class ProjectComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            projectsLoaded: false,
            sta5rProjects: [],
            star5ProjectStatues: [],
            logoImage: 'logoimg',
            uuid: '',
            name: '',
            contractId: '',
            URL: ''
        }
        this.getAllUserProjects();
        this.addNewProject = this.addNewProject.bind(this)
        this.createOrEditProject = this.createOrEditProject.bind(this)
        this.getAllUserProjects = this.getAllUserProjects.bind(this)
        this.changeProject = this.changeProject.bind(this)
        this.changeStatus = this.changeStatus.bind(this)


    }
    getAllUserProjects() {
        axios.post(`${API_URL}/getProjectsByUser`, { login: localStorage.getItem('authenticatedUser') })
            .then(res => {
                this.setState({ sta5rProjects: res.data });
                this.setState({ projectsLoaded: true });


            })
    }

    changeProject = (uuid) => {
        axios.post(`${API_URL}/getProject`, { uuid: uuid })
            .then(res => {
                this.setState({ star5ProjectStatues: res.data.statues });
                this.setState({ uuid: res.data.uuid });
                $('#name').val(res.data.name);
                $('#URL').val(res.data.url);
                $('#contractId').val(res.data.contractNumber);
            })
    }


    changeStatus = (uuid, finish, skipped) => {
        console.log("change status");
        axios.post(`${API_URL}/changeStatus`, { uuid: uuid, finish: finish, skipped: skipped })
            .then(res => {

            })
    }

    createOrEditProject(name, number, url) {

        axios.post(`${API_URL}/addNew5star`, {
            name: name,
            statues: this.state.star5ProjectStatues, uuid: this.state.uuid, contractNumber: number, url: url, userName: localStorage.getItem('authenticatedUser')
        })
            .then(res => {
                if (res.data === true) {
                    console.log("Adding new Project");
                    this.setState({ projectsLoaded: false });
                    this.getAllUserProjects();
                }


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
            this.setState({ uuid: res.data.uuid });
            this.setState({ star5ProjectStatues: res.data.statues });
            $('#name').val("");
            $('#URL').val("");
            $('#contractId').val("");

        })
    }
    render() {
        const projectsLoaded = this.state.projectsLoaded;
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
                    <div>
                        <div>
                            {projectsLoaded ? (
                                <Sidebar projects={this.state.sta5rProjects} changeProject={this.changeProject} />
                            ) : (
                                    "Brak projektów"
                                )}
                        </div>
                    </div>
                    <Content start5={this.state.star5ProjectStatues} logo={this.state.logoImage} saveProject={this.createOrEditProject} changeStatus={this.changeStatus} />
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(ProjectComponent)