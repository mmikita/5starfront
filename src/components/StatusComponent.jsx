import React, { Component } from 'react'
import '../css/Login.css';
import PropTypes from 'prop-types';


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
            <div id={this.props.status.uuid} key={this.props.status.name} className= {(this.props.status.finish ? 'toDoLiDone' : this.props.status.skipped ? 'toDoLiSkipped' : 'toDoLi')}>     
            <span>skonczony</span><span> {this.props.status.finish.toString()}</span>
            <span> pominiety</span><span> {this.props.status.skipped.toString()}</span>
            {this.props.status.finish ? (
              <div>
              <button onClick={() => this.props.changeStatus(this.props.status.uuid,false,false)}>niezrobione</button>
              </div>
            ) : (
                <div>
                  <button onClick={() => this.props.changeStatus(this.props.status.uuid,true,false)}>zrobione</button>
                  {this.props.status.skipped===false ? (  <button onClick={() => this.props.changeStatus(this.props.status.uuid,false,true)}>pomiń</button>  ) : (<button onClick={() => this.props.changeStatus(this.props.status.uuid,false,false)}>do zrobienia</button> )}
                </div>
              )}
          </div>
        )
    }
}

StatusComponent.propTypes = {
    StatusComponent: PropTypes.string.isRequired,
  };

export default StatusComponent