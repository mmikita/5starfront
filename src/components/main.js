import React, { Component } from 'react'
import Sidebar from './sidebar'
import Content from './content'


export default class Main extends Component {
    render() {
      return(
        <div className="app">
          <Sidebar />
          <Content />
        </div>
      ); 
    }
  }