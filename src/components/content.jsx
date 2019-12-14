import React, { Component } from 'react'
import logo from '../resources/img/5StarWeb_logo.png'
import { useState } from 'react';
import $ from 'jquery'; 
export default class Content extends Component {

  constructor(props) {
    
    super(props)
    this.state = {
      blankContent: "",
      projectName: "",
      projectUrl: "",
      contractId: "",
      saveProject: props.saveProject
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
        <div id= "statuesList" className="disableStatues">
        {this.props.start5.map((status) => {
          return <div key={status.name} className="toDoLi">
            <span>{status.name}</span>
            <span>i</span>
            <span>...</span>
            <button>ok</button>
          </div>
        })}
      </div>
      </div>
    </div>
  }
}

function ProjectForm(props) {
  const [projectName, setProjectName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [contractId, setContractId] = useState('');
  return (
    <div className="projectData">
      <div>
        <form>
          <div>
            <label htmlFor="name">Nazwa projektu</label>
            <input name="name" id="name" value={projectName} onChange={e => setProjectName(e.target.value)} />
          </div> <div>
            <label htmlFor="contractId">Nr umowy</label>
            <input name="contractId" id="contractId" value={contractId} onChange={e => setContractId(e.target.value)} />
          </div> <div>
            <label htmlFor="url">URL</label>
            <input name="URL" id="URL" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} />
          </div>

          <div className="saveEditbutton">
          <button  type="button" id="save" onClick={() => updateInputValue(props.saveProject)}>Zapisz</button>          </div>

        </form>
      </div>
    </div>
  );


}

function updateInputValue(saveProject) {


if($('#save').text()==="Zapisz"){
  $('#name').prop("disabled", true);
  $('#URL').prop("disabled", true);
  $('#contractId').prop("disabled", true);
  $('#save').text('Edytuj');
  $("#statuesList").removeClass("disableStatues");
  saveProject( $('#name').val(), $('#contractId').val(),$('#URL').val()); 
}

else{
  $('#save').text('Zapisz');
  $('#name').prop("disabled", false);
  $('#URL').prop("disabled", false);
  $('#contractId').prop("disabled", false)
  $("#statuesList").addClass("disableStatues");
}
}



