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
      contractId: ""


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
    let saveEditButton = <saveEditbutton />;

    if (this.props.start5.length !== 0) {
      console.log(this.props.start5)
      projectName = <ProjectForm />;
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
            <a href="#" id="save" onClick={() => updateInputValue(projectName, projectUrl, contractId)}>Zapisz</a>
          </div>

        </form>
      </div>
    </div>
  );


}

function updateInputValue(name, number, url) {
  console.log(name);
  console.log(number);
  console.log($('#save').text());

if($('#save').text()==="Zapisz"){
  $('#name').prop("disabled", true);
  $('#URL').prop("disabled", true);
  $('#contractId').prop("disabled", true);
  $('#save').text('Edytuj');

}
else{
  $('#save').text('Zapisz');
  $('#name').prop("disabled", false);
  $('#URL').prop("disabled", false);
  $('#contractId').prop("disabled", false);
  
}
}
function SaveEditbutton(props) {
  return (
    <div className="saveEditbutton">
      <button>Zapisz</button>
    </div>
  );



}


