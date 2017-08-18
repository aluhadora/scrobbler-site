import React, { Component } from 'react';
import './App.css';
import Track from './Track.js';
import * as Actions from './Actions.js';
var $ = require('jquery');

class App extends Component {
  updateTracks (context) {
    Actions.pullTracks(obj => {
      context.setState(function () {
        return {
          tracks: obj.error ? obj : obj.recenttracks.track
        };
      });
    }, context.state ? context.state.user : new URL(window.location).searchParams.get('user'));
  }

  componentDidMount () {
    var url = new URL(window.location);
    var user = url.searchParams.get('user');
    var code = url.searchParams.get('code');
    var access_token = url.searchParams.get('access_token');
    if (!access_token && window.location.toString().includes('#access_token')) {
      window.location = window.location.toString().replace('#', '?');
    }

    user = user || Actions.getCookie('user');
    Actions.storeCookie('user', user);

    code = code || Actions.getCookie('code');
    Actions.storeCookie('code', code);

    access_token = access_token || Actions.getCookie('access_token');
    Actions.storeCookie('access_token', access_token);

    if (user) this.setState(function () {
      return {
        user: user
      };
    });

    var context = this;
    this.updateTracks(context);
    setInterval(() => this.updateTracks(context), 5000);
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
        trackControls.push(<Track key={i} track={track} index={i} />);
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
