import React, { Component } from 'react'
import SidebarIcon from './SidebarIcon'


export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  renderSidebar = () => {
    if (!this.state.isOpen) {
      return null
    }

    return <div className="sidebar">
      <form>
        <input id="projectInputFilter" onChange={() => this.props.filterProjects()}
          placeholder="Wyszukaj projekt... "/>
      </form>
      <div className="projectList">
      {this.props.projects.map((project) => {
          return< div className={(this.props.selectedProject===project.uuid ? 'selectedProject' :'')}>  <div key={project.uuid} className="projectOnList">
            <div className="projectName" onClick={() => this.props.changeProject(project.uuid)}>
            <h4>{project.name}</h4>
            <span></span>
            <span></span>
            </div>
            <button className="deleteButton" onClick={() =>  window.confirm("Na pewno usuwamy?") && this.props.deleteProject(project.uuid)}>usuń</button>
          </div>    </div>
        })}
      </div>
    </div>     

  }

 
  toggleSidebar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }
  render() {
    return <div className="sidebar-container">
      <div className="sidebar-icon">
        <SidebarIcon
          isOpen={this.state.isOpen}
          handleClick={this.toggleSidebar}
        />
      </div>
      {this.renderSidebar()}
    </div>
  }
}