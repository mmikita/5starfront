import React, { Component } from 'react'
import logo from '../resources/img/5StarWeb_logo.png'
import $ from 'jquery';
export default class Content extends Component {

  constructor(props) {

    super(props)
    this.state = {
      blankContent: "",
      projectName: "",
      projectUrl: "",
      contractId: "",
      saveProject: props.saveProject,
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


    if (this.props.start5.length !== 0) {
      projectName = <ProjectForm saveProject={this.state.saveProject} />;
    }
    return <div
      className="content-container">
      <img className={this.props.logo} src={logo} alt="Logo" />
      <div className="project">
        {projectName}
        <div id="statuesList" className="disableStatues">
          {this.props.start5.map((status) => {
            return <div key={status.name} className="toDoLi">
              <span>{status.name}</span>
              {status.finish ? (
                <button onClick={() => this.props.changeStatus(status.uuid,status.finish,status.skipped)}>zrobione</button>
              ) : (
                  <div>
                    <button onClick={() => this.props.changeStatus(status.uuid,status.finish,status.skipped)}>niezrobione</button>
                    <button>pomiń</button>
                  </div>
                )}
            </div>
          })}
        </div>
      </div>
    </div>
  }
}

function ProjectForm(props) {

  return (
    <div className="projectData">
      <div>
        <form>
          <div>
            <div>
              <label htmlFor="name">Nazwa projektu</label>
              <input name="name" id="name" />
            </div> <div>
              <label htmlFor="contractId">Nr umowy</label>
              <input name="contractId" id="contractId" />
            </div> <div>
              <label htmlFor="url">URL</label>
              <input name="URL" id="URL" />
            </div>
          </div>
          <div className="saveEditbutton">
            <button type="button" id="save" onClick={() => updateInputValue(props.saveProject)}>Zapisz</button>          </div>
        </form>
      </div>
    </div>
  );


}

function updateInputValue(saveProject) {


  if ($('#save').text() === "Zapisz") {
    $('#name').prop("disabled", true);
    $('#URL').prop("disabled", true);
    $('#contractId').prop("disabled", true);
    $('#save').text('Edytuj');
    $("#statuesList").removeClass("disableStatues");
    saveProject($('#name').val(), $('#contractId').val(), $('#URL').val());
  }

  else {
    $('#save').text('Zapisz');
    $('#name').prop("disabled", false);
    $('#URL').prop("disabled", false);
    $('#contractId').prop("disabled", false)
    $("#statuesList").addClass("disableStatues");
  }
}



