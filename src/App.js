import React, { Component } from 'react';
import './App.css';
import Track from './Track.js';
import * as Actions from './Actions.js';
var $ = require('jquery');

class App extends Component {
  updateTracks(context) {
    Actions.pullTracks(obj => {
      console.log(obj);
      context.setState(function () {
        return {
          tracks: obj.error ? obj: obj.recenttracks.track,
        };
      });
    }, context.state ? context.state.user : new URL(window.location).searchParams.get('user'));
  }

  componentDidMount() {

    var url = new URL(window.location);
    var user = url.searchParams.get('user');
    user = user ? user : Actions.user();
    if (user) this.setState(function () {
      return {
        user: user
      };
    });

    var context = this;
    this.updateTracks(context);
    setInterval(() => this.updateTracks(context), 5000);


  }

  componentDidUpdate() {
    document.querySelector('#lastFm').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
      if ($(this).val()) {
        window.location.href = "/?user=" + $(this).val();
      }
    }
    });
  }

  render() {
    if (!this.state) return (<div></div>);

    console.log(this.props);
    const { tracks, user } = this.state;
    var trackControls = [];

    for (var i = 0; i < tracks.length; i++) {
      var track = tracks[i];
      trackControls.push(<Track key={i} name={track.name} artist={track.artist['#text']}
        album={track.album['#text']} img={track.image[2]['#text']} attr={track.attr}
        date={track.date} index={i} />);
    }

    var message = (<div></div>);
    if (tracks.error) message = (
      <p className="App-intro">
        {tracks.message}
      </p>
    );

    return (
      <div className="App">
        <p className="App-intro" style={{ paddingLeft: '1em', paddingBottom: '1em'}}>
          User: <input type="text" id="lastFm" defaultValue={user}></input>
        </p>
        <p className="App-intro">
          Pulling recent tracks from <code>{user}</code>.
        </p>
        {message}
        {trackControls}
      </div>
    );
  }
}

export default App;
