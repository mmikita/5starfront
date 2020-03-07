import React, { Component } from 'react'
import $ from 'jquery';

class StatusComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectsLoaded: this.props.status.name,
      value: '',
      typingTimer: 0,
      doneTypingInterval: 2000,
      uuid: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.doneTyping = this.doneTyping.bind(this)
  }  
  onKeyUp() {
    clearTimeout(this.state.typingTimer);
    this.setState({ value: $('#note'+this.props.status.uuid+'>textarea').val()});
    this.setState({ uuid: this.props.status.uuid});

    this.setState({ typingTimer: setTimeout(this.doneTyping, this.state.doneTypingInterval) });
  }

   doneTyping () {
    console.log(this.state.typingTimer);

    // var input = $('#note'+this.props.status.uuid+'>textarea');
    this.props.updateUserNote(this.state.uuid, this.state.value);
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
    return (
      <div>
        <div className="statusWrapper">
          <div id={this.props.status.uuid} key={this.props.status.name} className={(this.props.status.finish ? 'toDoLiDone' : this.props.status.skipped ? 'toDoLiSkipped' : 'toDoLi')}>
            <div className="statusWrapper">
              <div className="changeStatusWrapper">
                <div><span> {this.props.status.orderPlace}</span></div>
                <div>
                  {this.props.status.finish ? (
                    <p>Zrobione</p>
                  ) : (
                      <span>
                        {this.props.status.skipped === false ? (<p>Niezrobione</p>) : (<p>Pominięte</p>)}
                      </span>
                    )}
                </div>
                <div className="statusName">
                  <p>
                    <span></span><span> {this.props.status.name}</span> </p>
                </div>
                <div className="statusNote"> <p> {this.props.status.statusNote}</p></div>
                <div>
                  {this.props.status.finish ? (
                    <div>
                      <button onClick={() => this.props.changeStatus(this.props.status.uuid, false, false)}>niezrobione</button>
                    </div>
                  ) : (
                      <div>
                        <button onClick={() => this.props.changeStatus(this.props.status.uuid, true, false)}>zrobione</button>
                        {this.props.status.skipped === false ? (<button onClick={() => this.props.changeStatus(this.props.status.uuid, false, true)}>pomiń</button>) : (<button onClick={() => this.props.changeStatus(this.props.status.uuid, false, false)}>do zrobienia</button>)}
                      </div>
                    )}</div>
                <div>
                  <button className="deleteStatusButton" onClick={() => this.props.deleteStatus(this.props.status.uuid)}>usuń</button>
                </div>

                <div>
                <button className="showHideUserNote" onClick={() => this.props.showHideUserNote(this.props.status.uuid)}>pokaż/ukryj</button>
                </div>
              </div>
            </div>
          </div>
          <div  id={'note'+this.props.status.uuid} style={{display: "none"}}   
          className="userNote"><textarea  onKeyUp={this.onKeyUp} name="userNote" defaultValue={this.state.projectsLoaded} 
           ></textarea></div>
          </div>

      </div>
    )
  }
}
export default StatusComponent