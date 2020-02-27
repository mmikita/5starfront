import React, { Component } from 'react'
import '../css/Login.css';


class StatusComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
    this.handleChange = this.handleChange.bind(this)
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
      <div className="statusWrapper">
        <div id={this.props.status.uuid} key={this.props.status.name} className={(this.props.status.finish ? 'toDoLiDone' : this.props.status.skipped ? 'toDoLiSkipped' : 'toDoLi')}>
        <div className="statusWrapper">
        <div className="changeStatusWrapper">
         <div>
          <span>numer: </span><span> {this.props.status.orderPlace}</span>
          <span> pominiety</span><span> {this.props.status.skipped.toString()}</span>
          </div>
          {this.props.status.finish ? (
            <div>
              <button onClick={() => this.props.changeStatus(this.props.status.uuid, false, false)}>niezrobione</button>
            </div>
          ) : (
              <div>
                <button onClick={() => this.props.changeStatus(this.props.status.uuid, true, false)}>zrobione</button>
                {this.props.status.skipped === false ? (<button onClick={() => this.props.changeStatus(this.props.status.uuid, false, true)}>pomiń</button>) : (<button onClick={() => this.props.changeStatus(this.props.status.uuid, false, false)}>do zrobienia</button>)}
              </div>
            )}
            </div>
            <div>

<button onClick={() => this.props.deleteStatus(this.props.status.uuid)}>usuń</button>
            </div>
            </div>
            <div className="statusNore">
<textarea></textarea>

            </div>
        </div>
      </div>
    )
  }
}



export default StatusComponent