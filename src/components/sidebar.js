import React, { Component } from 'react'
import SidebarIcon from './SidebarIcon'
export default class Sidebar extends Component {
  state = {
    isOpen: true
  }

  renderSidebar = () => {
    if (!this.state.isOpen) {
      return null
    }

    return <div className="sidebar">
      <form>
        <input
          placeholder="Wyszukaj projekt... "
        />
        <p>Status:</p>

        <ul>
          <li>
            <label>
              <input
                name="status"
                type="radio"

              /*
              checked={this.state.size === "small"}
              onChange={this.handleChange}*/
              />
              Wszystkie
          </label>
          </li>

          <li>
            <label>
              <input
                name="status"
                type="radio"
              />
              W trakcie
          </label>
          </li>

          <li>
            <label>
              <input
                name="status"
                type="radio"
              /* value="large" */
              />
              Zakończone
          </label>
          </li>
        </ul>
        <div>
          <p>Sortuj po...</p>
          <select name="cars">
            <option value="date">dacie dodania</option>
            <option value="name">nazwie</option>
          </select>
        </div>
      </form>
    </div>
  }
  toggleSidebar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }))
  }
  render() {
    return <div className="sidebar-container">
      <div className="sidebar-icon">
        <SidebarIcon
          isOpen={this.state.isOpen}
          handleClick={this.toggleSidebar}
        />
      </div>
      {this.renderSidebar()}
    </div>
  }
}