import React, { Component } from 'react'
import { placeholderContent } from './placeholderContent'
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


    const elements = [];

    return <div
      className="content-container">
      <img className={this.props.logo} src={logo} alt="Logo" />

      <div className="project">
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