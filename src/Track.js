import React, { Component } from 'react';
import './App.css';

class Track extends Component {

  timeline(timeDiff, timeName) {
    var truncedTimeDiff = Math.trunc(timeDiff);
    return truncedTimeDiff + ' ' + timeName + (truncedTimeDiff === 1 ? '' : 's') + ' ago';
  }

  dateline(attr, date) {
    if (attr && attr.nowplaying) return 'Now playing';
    if (!date) return 'Now playing';
    // return date.uts;
    var d = new Date(0);
    d.setUTCSeconds(date.uts);
    var timeDiff = Date.now() - date.uts * 1000;

    var secondsDiff = timeDiff / 1000;
    if (secondsDiff < 60) return this.timeline(secondsDiff, 'second');

    var minutesDiff = secondsDiff / 60;
    if (minutesDiff < 60) return this.timeline(minutesDiff, 'minute');

    var hoursDiff = minutesDiff / 60;
    if (hoursDiff < 24) return this.timeline(hoursDiff, 'hour');

    var daysDiff = hoursDiff / 60;
    return this.timeline(daysDiff, 'day');
  }

  render() {
    const { name, artist, album, img, attr, date, index } = this.props;

    return (
      <div className="Track" style={{opacity: index === 0 ? '1' : '0.8'}}>
        <div className="Album-Art">
          <img src={img} alt="logo" height="96" />
        </div>
        <div className="Track-Info">
          <div className="Info-line">
            <span className="Info-Field">Track:</span> {name}
          </div>
          <div className="Info-line">
            <span className="Info-Field">Artist:</span> {artist}
          </div>
          <div className="Info-line">
            <span className="Info-Field">Album:</span> {album}
          </div>
          <div className="Info-line" style={{paddingTop: '6px'}}>
            <span className="Info-Field">{this.dateline(attr, date)}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Track;
