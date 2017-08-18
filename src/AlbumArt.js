import React, { Component } from 'react';
import './App.css';

class AlbumArt extends Component {

  render () {
    const { track } = this.props;
    return (
      <div className="Album-Art">
        <div className="Spotify-Play-Wrapper">
          {track.spotifySource &&
            <iframe id="frame1" title={track.name} className="Spotify-Play" src={track.spotifySource} width="250" height="330" frameBorder="2" allowTransparency="true"></iframe>
          }
        </div>
        <img src={track.img} className="Album-Img" alt="album" />
      </div>
    );
  }
}

export default AlbumArt;
