import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./List";
import HomePage from "./conpements/homepage";
import ReactSlider from "./conpements/reactslider";
import {BrowserRouter,Route } from 'react-router-dom';

class App extends Component {
  componentDidMount(){
   
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">hello world</h1>
        </header>
        <nav>
          <List />
        </nav>
        <div className="main">
          <HomePage/>
        </div>
      </div>
    );
  }
}

export default App;
