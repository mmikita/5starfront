import React, { Component } from 'react'
import { placeholderContent } from './placeholderContent'
import logo from  '../resources/img/5StarWeb_logo.png'
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
    return <div
      className="content-container"
    >
{this.props.start5===!null ? "" : <div><img className="logoimg" src={logo} alt="Logo" /></div>}
{this.props.start5}
    </div>
  }
}