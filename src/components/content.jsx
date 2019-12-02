import React, { Component } from 'react'
import logo from '../resources/img/5StarWeb_logo.png'
export default class Content extends Component {


  constructor(props) {
    super(props)
    this.state = {
      blankContent: ""
    }
  }
  handleChange(event) {
    this.setState(
      {
        [event.target.name]
          : event.target.value
      }
    )
  }
  render() {
    let projectName;
    let saveEditButton = <saveEditbutton/>;

    if (this.props.start5.length !== 0 ) {
      console.log(this.props.start5)
      projectName = <ProjectForm/>;
    }
    return <div
      className="content-container">
      <img className={this.props.logo} src={logo} alt="Logo" />
      <div className="project">
        {projectName}
        {this.props.start5.map((status) => {
          return <div key={status.name} className="toDoLi">
            <span>{status.name}</span>
            <span>i</span>
            <span>...</span>
            <span>ok</span>
          </div>
        })}
      </div>
    </div>
  }
}

function ProjectForm(props) {

    let saveEditButton = <SaveEditbutton/>;
  
  return (
    <div className="projectData">
        <div>
      <form>
      <div>
      <label htmlFor="name">Nazwa projektu</label>
        <input name="name" id="name" />
        </div> <div>
        <label htmlFor="umowa">Nr umowy</label>
        <input name="umowa" id="umowa" />
        </div> <div>
        <label htmlFor="url">URL</label>
        <input name="URL" id="URL" />
        </div>
        <div>
        {saveEditButton}
        </div>
      </form>
      </div>
    </div>
  );
}


function SaveEditbutton(props) {
  return (
    <div className="saveEditbutton">
      <button>Save</button>
    </div>
  );
}