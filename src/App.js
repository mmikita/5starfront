import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar'
import Content from './components/content'

function App() {
  return  (
    <div className="app">
      <Sidebar />
      <Content />
    </div>
  );
}

export default App;
