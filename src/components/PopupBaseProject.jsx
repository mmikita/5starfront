import React from 'react';  
import axios from 'axios';
import $ from 'jquery';
import StatusComponent from './StatusComponent.jsx';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';



const API_URL = global.apiUrl;


const SortableStatuesContainer = sortableContainer(({ children }) => <div className="statues">{children}</div>);

const SortableStatus = sortableElement(({ status, changeStatus, deleteStatus, index, showHideUserNote, updateUserNote }) => 
<StatusComponent index={index} key={status.orderPlace}
status={status} changeStatus={changeStatus}  deleteStatus={deleteStatus} showHideUserNote={showHideUserNote} 
updateUserNote={updateUserNote}/>);

class Popup extends React.Component {  
  constructor(props) {
    super(props)
    this.state = {
      uuid: '',
      star5ProjectStatues: []
      
    }
    this.getBaseProjectByUserName();
    this.getBaseProjectByUserName = this.getBaseProjectByUserName.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.addStatus = this.addStatus.bind(this)
    this.deleteStatus = this.deleteStatus.bind(this)
    this.getIndex = this.getIndex.bind(this)
    this.showHideUserNote = this.showHideUserNote.bind(this)
    this.updateUserNote = this.updateUserNote.bind(this)
    this.updateUserNotes = this.updateUserNotes.bind(this)


}


showHideUserNote(uuid) {
  if($('#note'+uuid).is(":hidden")){ 
  $('#note'+uuid).show();
}
  else{
  $('#note'+uuid).hide();
}  }

updateUserNote(uuid, value) {
  axios.post(`${API_URL}/projects/updateStatusUserNote`, { uuid: uuid, userNote: value })
 .then(res => {
  })
}


updateUserNotes(){

  var statues = this.state.star5ProjectStatues;
  var self = this;
//  console.log(statues)
  $('#statuesList  div.statues > div:not(:last)').each(function(index, value) {
var statusIndex = self.getIndex(value.firstChild.firstChild.id, statues, "uuid")
      var noteValue = statues[statusIndex].userNote;
      $(value.firstChild.lastChild.firstChild).val(noteValue);
    });
}

  getBaseProjectByUserName() {
    axios.post(`${API_URL}/projects/getBaseProject`, { username: sessionStorage.getItem('authenticatedUser') })
        .then(res => {
          this.setState({ star5ProjectStatues: res.data.statues });
          this.setState({ uuid: res.data.uuid });
          this.updateUserNotes();
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


onSortEnd = ({ oldIndex, newIndex }) => {
  console.log("oldindex  "+ oldIndex+ " newIndex: " + newIndex);
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
return (  
<div className='popup'>  
<div className='popup\_inner'>  
<h1>{this.props.text}</h1>  
<div id="statuesList" >
          <SortableStatuesContainer axis='y' revert='true' scroll='false' placeholder="sortable-placeholder" cursor="move"
            onSortEnd={this.onSortEnd}>
            {this.state.star5ProjectStatues !== undefined ? this.state.star5ProjectStatues.map((status) =>
              <SortableStatus
                key={status.orderPlace}
                status={status}
                index={status.orderPlace}
                StatusComponent={status}
                changeStatus={this.changeStatus}
                deleteStatus={this.deleteStatus}
                showHideUserNote={this.showHideUserNote}
                updateUserNote={this.updateUserNote}
              />
            
            ):('')}
          </SortableStatuesContainer>
        
        </div>

      <div> <AddStatus addStatus={this.addStatus} /> </div> 
<button onClick={this.props.closePopup}>Zamknij</button>  
</div>  
</div>  
);  
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
                  <input id="newBaseStatusName" name="1"  />
                </div>
                <div>
                  <label htmlFor="2">Opis Statusu</label>
                  <input id="newBaseStatusNote" name="2"  />
                </div>
              </div>
              <div>
                <button type="button" id="addBaseStatus" onClick={() =>
                   props.addStatus($('#newBaseStatusName').val(), 
                   $('#newBaseStatusNote').val())}>Dodaj</button>
                   </div>
            </form>
          </div>
    </div>
  );
}




 

export default Popup;