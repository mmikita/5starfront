import React, { Component } from 'react'
import Sidebar from './sidebar'
import Content from './content'
import MenuComponent from './MenuComponent';



export default class Main extends Component {
  render() {
    return (
      <div className="app">
        <MenuComponent />
      </div>
    );
  }
}