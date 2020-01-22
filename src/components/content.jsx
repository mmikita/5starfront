import React, { Component } from 'react'
import logo from '../resources/img/5StarWeb_logo.png'
import $ from 'jquery';
import StatusComponent from './StatusComponent.jsx';


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

    // {this.props.start5.map((status) => <StatusComponent key = {status.uuid} status={status} changeStatus={this.props.changeStatus} />)}  

    // const SortableGifsContainer = sortableContainer(({ children }) => <div className="statues">{children}</div>);
    
    // const SortableStatus = sortableElement(({ status }) =>  <StatusComponent key = {status.uuid} status={status} changeStatus={this.props.changeStatus} />);

    


  
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

 {/* <SortableGifsContainer axis="y">
  {gifs.map((gif, i) =>
    <SortableGif
    // don't forget to pass index prop with item index
      index={i}
      key={gif}
      gif={gif}
    />
  )}
</SortableGifsContainer> */}

        {this.props.start5.map((status) => <StatusComponent key = {status.uuid} status={status} changeStatus={this.props.changeStatus} />)}  

      
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



