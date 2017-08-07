import React, { Component } from 'react';
import './App.css';
import Track from './Track.js';
import * as Actions from './Actions.js';


class App extends Component {
  render() {
    var tracks = [];

    Actions.pullTracks(obj => {
      var trackInfos = obj.recenttracks.track;

      for (var i = 0; i < trackInfos.length; i++) {
        var track = trackInfos[i];
        console.log(track);
        tracks.push(<Track key={i} name={track.name} artist={track.artist['#text']}
          album={track.album['#text']} img={track.image[2]['#text']} attr={track.attr}
          date={track.date} index={i} />);
      }
    });

    return (
      <div className="App">
        <p className="App-intro">
          Pulling recent tracks from <code>aluhadora</code>.
        </p>
        {tracks}
      </div>
    );
  }
}

export default App;
