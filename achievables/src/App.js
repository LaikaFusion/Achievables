import React, { Component } from 'react';
import './App.css';

import LandingPage from './components/LandingPage/LandingPage';
import Authentication from './components/Authentication/Authentication';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Authentication />
      </div>
    );
  }
}

export default App;
