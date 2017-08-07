import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Track extends Component {
  render() {
    return (
      <div className="Track">
        <div className="Album-Art">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Track-Info">
          <div className="Info-line">
            <span className="Info-Field">Track:</span> A song
          </div>
          <div className="Info-line">
            <span className="Info-Field">Artist:</span> An artist
          </div>
          <div className="Info-line">
            <span className="Info-Field">Album:</span> An album
          </div>
          <div className="Info-line">
            <span className="Info-Field">Now playing</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
