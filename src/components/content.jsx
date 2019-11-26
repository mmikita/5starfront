import React, { Component } from 'react'
import { placeholderContent } from './placeholderContent'
export default class Content extends Component {
  render() {
    return <div
      className="content-container"
    >
{this.props.start5}

    </div>
  }
}