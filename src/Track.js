import React, { Component } from 'react';
import './App.css';
import AlbumArt from './AlbumArt.js';

class Track extends Component {

  timeline(timeDiff, timeName) {
    var truncedTimeDiff = Math.trunc(timeDiff);
    return truncedTimeDiff + ' ' + timeName + (truncedTimeDiff === 1 ? '' : 's') + ' ago';
  }

  dateline(attr, date) {
    if (this.nowPlaying(attr, date)) return 'Now playing';

    var d = new Date(0);
    d.setUTCSeconds(date.uts);
    var timeDiff = Date.now() - date.uts * 1000;

    var secondsDiff = timeDiff / 1000;
    if (secondsDiff < 60) return this.timeline(secondsDiff, 'second');

    var minutesDiff = secondsDiff / 60;
    if (minutesDiff < 60) return this.timeline(minutesDiff, 'minute');

    var hoursDiff = minutesDiff / 60;
    if (hoursDiff < 24) return this.timeline(hoursDiff, 'hour');

    var daysDiff = hoursDiff / 24;
    return this.timeline(daysDiff, 'day');
  }

  nowPlaying (attr, date) {
    if (attr && attr.nowplaying) return true;
    if (!date) return true;

    return false;
  }

  render() {
    const { track } = this.props;

    return (
      <div className="Track" style={{opacity: this.nowPlaying(track.attr, track.date) ? '1' : '0.8'}}>
        <AlbumArt track={track} />
        <div className="Track-Info">
          <div className="Info-line">
            <span className="Info-Field">Track:</span> {track.name}
          </div>
          <div className="Info-line">
            <span className="Info-Field">Artist:</span> {track.artist}
          </div>
          <div className="Info-line">
            <span className="Info-Field">Album:</span> {track.album}
          </div>
          <div className="Info-line" style={{paddingTop: '6px'}}>
            <span className="Info-Field">{this.dateline.bind(this)(track.attr, track.date)}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
