import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Track from './Track.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Pulling recent tracks from <code>aluhadora</code>.
        </p>
        <Track />
      </div>
    );
  }
}

export default App;
