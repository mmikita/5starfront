import React, { Component } from 'react'
import logo from '../resources/img/5StarWeb_logo.png'
import $ from 'jquery';
import StatusComponent from './StatusComponent.jsx';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';

const SortableStatuesContainer = sortableContainer(({ children }) => <div className="statues">{children}</div>);

const SortableStatus = sortableElement(({ status, changeStatus, deleteStatus, index }) => <StatusComponent index={index} key={status.orderPlace} status={status} changeStatus={changeStatus}  deleteStatus={deleteStatus}/>);

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
  
      projectName = <ProjectForm saveProject={this.state.saveProject} />
  
    return( <div className="content-container">
      <img className={this.props.logo} src={logo} alt="Logo" />
      <div className="project">
        {projectName}
        <div id="statuesList" className="disableStatues">
          <SortableStatuesContainer axis='y' revert='true' scroll='false' placeholder="sortable-placeholder" cursor="move"
            onSortEnd={this.props.onSortEnd}>
            {this.props.start5 !== undefined ? this.props.start5.map((status) =>
              <SortableStatus
                key={status.orderPlace}
                status={status}
                index={status.orderPlace}
                StatusComponent={status}
                changeStatus={this.props.changeStatus}
                deleteStatus={this.props.deleteStatus}
              />
            
            ):('')}
          </SortableStatuesContainer>
      
        </div>
        <AddStatus addStatus={this.props.addStatus} /> 
      </div>
    </div>
            )
  }
}
function AddStatus(props) {
  return (
    <div className="addStatus">
        <div>
            <form>
              <div>
                <div>
                  <label htmlFor="1">Nazwa statusu</label>
                  <input id="newStatusName" name="1"  />
                </div>
                <div>
                  <label htmlFor="2">Opis Statusu</label>
                  <input id="newStatusNote" name="2"  />
                </div>
              </div>
              <div>
                <button type="button" id="addStatus" onClick={() => addStatus(props.addStatus)}>Dodaj</button>          </div>
            </form>
          </div>
    </div>
  );
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

function addStatus(addStatus) {
addStatus($('#newStatusName').val(), $('#newStatusNote').val());
}


