import React, { Component } from 'react';
import './App.css';
import Track from './Track.js';
import * as Actions from './Actions.js';
var $ = require('jquery');

class App extends Component {
  updateTracks () {
    Actions.pullTracks(obj => {
      this.setState(function () {
        return {
          tracks: obj.error ? obj : obj.recenttracks.track
        };
      });
      this.forceUpdate();
    }, this.state.user);
  }

  componentDidMount () {
    var user = this.storeParam('user');
    this.storeParam('code');
    this.storeParam('access_token');

    this.setState(function () {
      return {
        user: user
      };
    }, function () {
      this.updateTracks.bind(this)();
      setInterval(this.updateTracks.bind(this), 5000);
    }.bind(this));
  }

  storeParam(name) {
    var loc = window.location.toString().replace('#access_token', '?access_token');
    var url = new URL(loc);

    var value = url.searchParams.get(name) || Actions.getCookie(name);
    Actions.storeCookie(name, value);
    return value;
  }

  componentDidUpdate () {
    document.querySelector('#lastFm').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      if ($(this).val()) {
        window.location.href = '/?user=' + $(this).val();
      }
    }
    });
  }

  render () {
    if (!this.state) return (<div></div>);

    const { tracks, user } = this.state;
    var trackControls = [];

    if (tracks) {
      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        trackControls.push(<Track key={i} track={track} />);
      }
    }

    var message = (<div></div>);
    if (tracks && tracks.error) message = (
      <p className="App-intro">
        {tracks.message}
      </p>
    );

    var display = (<div></div>);
    if (tracks && !tracks.hideDisplay) display = (
      <p className="App-intro">
        Pulling recent tracks from <code>{user}</code>.
      </p>
    );

    return (
      <div className="App">
        <p className="App-intro" style={{ paddingLeft: '1em', paddingBottom: '1em'}}>
          User: <input type="text" id="lastFm" defaultValue={user}></input>
        </p>
        {display}
        {message}
        {trackControls}
      </div>
    );
  }
}

export default App;
