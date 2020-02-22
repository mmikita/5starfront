import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';
import UseAnimations from 'react-useanimations';
import axios from 'axios';
import Sidebar from './sidebar'
import Content from './content.jsx'
import $ from 'jquery';
import arrayMove from 'array-move';
import Popup from './PopupBaseProject.jsx';

const API_URL = global.apiUrl
class ProjectComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectsLoaded: false,
            sta5rProjects: [],
            star5ProjectStatues: [],
            logoImage: 'logoimgwith5star',
            uuid: '',
            name: '',
            contractId: '',
            URL: '',
            showPopup: false,
            currentStatus: ''
        }
        this.getAllUserProjects();
        this.addNewProject = this.addNewProject.bind(this)
        this.createOrEditProject = this.createOrEditProject.bind(this)
        this.getAllUserProjects = this.getAllUserProjects.bind(this)
        this.changeProject = this.changeProject.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.getIndex = this.getIndex.bind(this)
        this.deleteProject = this.deleteProject.bind(this)
        this.onSortEnd = this.onSortEnd.bind(this)
        this.addStatus = this.addStatus.bind(this)
        this.deleteStatus = this.deleteStatus.bind(this)
        this.togglePopup = this.togglePopup.bind(this)
    }
    getAllUserProjects() {
        axios.post(`${API_URL}/projects/getProjectsByUser`, { login: sessionStorage.getItem('authenticatedUser') })
            .then(res => {
                this.setState({ sta5rProjects: res.data });
                this.setState({ projectsLoaded: true });
            })
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    changeProject = (uuid) => {
        axios.post(`${API_URL}/projects/getProject`, { uuid: uuid })
            .then(res => {
                this.setState({ star5ProjectStatues: res.data.statues });
                this.setState({ uuid: res.data.uuid });
                $('#name').val(res.data.name);
                $('#URL').val(res.data.url);
                $('#contractId').val(res.data.contractNumber);
                $('.toDoLi, .toDoLiSkipped, .toDoLiDone').removeAttr('style');
                $('#name').prop("disabled", true);
                $('#URL').prop("disabled", true);
                $('#contractId').prop("disabled", true);
                $('#save').text('Edytuj');
                $("#statuesList").removeClass("disableStatues");
            })
    }
    changeStatus = (uuid, finish, skipped) => {
        const index = this.getIndex(uuid, this.state.star5ProjectStatues, "uuid");
        var statues = this.state.star5ProjectStatues;
        statues[index].finish = finish;
        statues[index].skipped = skipped;
        this.setState({ star5ProjectStatues: statues });
        axios.post(`${API_URL}/projects/changeStatus`, { uuid: uuid, finish: finish, skipped: skipped })
            .then(res => {

            })
    }
    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }
    addStatus(name, statusNote) {
        var newStatus = {};
        newStatus.name = name;
        newStatus.statusNote = statusNote;
        newStatus.finish = false;
        newStatus.orderPlace = this.state.star5ProjectStatues.length;
        newStatus.skipped = false;
        axios.post(`${API_URL}/projects/addStatus`, { uuid: this.state.uuid, name: name, statusNote: statusNote })
            .then(res => {
                newStatus.uuid = res.data;
                this.setState(previousState => ({
                    star5ProjectStatues: [...previousState.star5ProjectStatues, newStatus]
                }));
                console.log(this.state.star5ProjectStatues);
            })
            this.forceUpdate();
    }
    createOrEditProject(name, number, url, uuid) {
        axios.post(`${API_URL}/projects/addNew5star`, {
            name: name,
            statues: this.state.star5ProjectStatues, uuid: this.state.uuid, contractNumber: number, url: url, userName: sessionStorage.getItem('authenticatedUser')
        })
            .then(res => {
                if (res.data === true) {
                    this.getAllUserProjects();
                } else {
                    const index = this.getIndex(this.state.uuid, this.state.sta5rProjects, "uuid");
                    var projects = this.state.sta5rProjects;
                    projects[index].name = name;
                    this.setState({ sta5rProjects: projects });
                }
            }
            )
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
        return axios.post(`${API_URL}/projects/createNew5star`, {userName: sessionStorage.getItem('authenticatedUser')}).then(res => {
            this.setState({ uuid: res.data.uuid });
            this.setState({ star5ProjectStatues: res.data.statues });
            $('#name').prop("disabled", false);
            $('#URL').prop("disabled", false);
            $('#contractId').prop("disabled", false);
            $('#save').text('Zapisz');
            $("#statuesList").addClass("disableStatues");
            $('#name').val("");
            $('#URL').val("");
            $('#contractId').val("");

        })
    }

    deleteProject(uuid) {

        const projects = this.state.sta5rProjects.filter(project => project.uuid !== uuid);
        this.setState({ sta5rProjects: projects });
        axios.post(`${API_URL}/projects/deleteProject`, { uuid: uuid })
            .then(res => {

            })
    }

    deleteStatus(uuid) {
        const statues = this.state.star5ProjectStatues.filter(status => status.uuid !== uuid);
        this.setState({ star5ProjectStatues: statues });
        axios.post(`${API_URL}/projects/deleteStatus`, { uuid: uuid, projectUuid: this.state.uuid})
            .then(res => {
                for (var i = 0; i < this.state.star5ProjectStatues.length; i++) {
                    statues[i].orderPlace = i;
                }
                this.setState({ star5ProjectStatues: statues });
            })
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        console.log("oldindex  "+oldIndex+ " newIndex: " + newIndex);
        this.setState({ star5ProjectStatues: arrayMove(this.state.star5ProjectStatues, oldIndex, newIndex) })
        this.forceUpdate();
        var statues = this.state.star5ProjectStatues;
        for (var i = 0; i < this.state.star5ProjectStatues.length; i++) {
            statues[i].orderPlace = i;
        }
        axios.post(`${API_URL}/projects/updateOrderPlaces`, statues)
            .then(res => {
            })
        this.setState({ star5ProjectStatues: statues });
    };

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <React.Fragment>
                <header>
                    <div onClick={this.addNewProject} className="star5">
                        {isUserLoggedIn && <UseAnimations animationKey="star" size={32} style={{ padding: 0 }} />}
                    </div>
                    <div className="separator">
                        <h3> Projekt bazowy </h3>
                        <button onClick={this.togglePopup.bind(this)}>Edytuj</button>
                        {this.state.showPopup ?
                            <Popup
                                text='Kliknij aby zamknąć'
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        }
                    </div>
                    <div className="login">
                        {isUserLoggedIn && <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Wyloguj</Link>}
                    </div>
                </header>
                <div className="content">
                    <div>
                        <div>
                            <Sidebar projects={this.state.sta5rProjects} changeProject={this.changeProject} deleteProject={this.deleteProject} /> deleteProject
                        </div>
                    </div>
                    <Content start5={this.state.star5ProjectStatues} logo={this.state.logoImage} saveProject={this.createOrEditProject} changeStatus={this.changeStatus} onSortEnd={this.onSortEnd} addStatus={this.addStatus} deleteStatus={this.deleteStatus} />
                </div>
            </React.Fragment>
        )
    }
}
export default withRouter(ProjectComponent)