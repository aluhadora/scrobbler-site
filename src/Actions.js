var $ = require('jquery');
var spotifyQueries = {};

export function pullTracks (callback, user) {
  if (!user) {
    callback({error: true, message: 'Enter a user', hideDisplay: true});
    return;
  }

  var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
   '&user=' + user + '&api_key=' + process.env.REACT_APP_SECRET_CODE + '&format=json&limit=25';

   $.ajax({
     method: 'Get',
     url: url,
     async: false
   }).done(data => {
     for (var i = 0; i < data.recenttracks.track.length; i++) {
       var track = data.recenttracks.track[i];
       track.img = imgLink(track);
       track.album = track.album['#text'];
       track.artist = track.artist['#text'];
       if (i < 5) {
         var urlStart = 'https://open.spotify.com/embed?uri=spotify%3Atrack%3A';
         track.spotifySource = undefined;
         searchSpotifyForTrack(track, data => track.spotifySource = urlStart + data);
       }
     }

     callback(data);
   });
}

function searchSpotifyForTrack (track, callback) {
  var code = getCookie('access_token');
  if (!code) {
    var loc = new URL(window.location);
    var urlToken = loc.searchParams.get('access_token');
    code = urlToken || getSpotifyKey();
  }
  var url = 'https://api.spotify.com/v1/search?type=track&q=track:' + track.name + ' artist:' + track.artist + ' album:' + track.album;

  if (spotifyQueries[url]) return callback(spotifyQueries[url]);
  spotifyQueries[url] = 'searching';

  $.ajax({
    method: 'Get',
    url: url,
    async: false,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + code
    }
  }).done(data => {
    spotifyQueries[url] = data.tracks.items[0].id;
    callback(data.tracks.items[0].id);
  }).fail(data => {
    spotifyQueries[url] = undefined;
    console.log('failed to search track');
    console.log(data);
  });
}

function getSpotifyKey() {
  // window.location = 'https://accounts.spotify.com/authorize/?client_id=6c68f4ce32df44939a77e56c3dfa488e&response_type=token&redirect_uri=http%3A%2F%2Flocalhost:3000%2F';
  window.location = 'https://accounts.spotify.com/authorize/?client_id=6c68f4ce32df44939a77e56c3dfa488e&response_type=token&redirect_uri=https%3A%2F%2Fscrobble-follow.herokuapp.com%2F';
}

export function storeCookie (name, value) {
  document.cookie = name + '=' + value;
}

export function getCookie (cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function querySpotifyForImage (callback, track) {
  // var url = 'https://api.spotify.com/v1/search?q=' + track.album['#text'] +
  //  '&type=album';
  //
  // if (spotifyQueries[url]) return callback(spotifyQueries[url]);
  //
  // $.ajax({
  //   method: 'Get',
  //   url: url,
  //   headers: {
  //     'Accept': 'application/json',
  //     'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_TOKEN
  //   }
  // }).done(data => {
  //   spotifyQueries[url] = data;
  //   callback(data);
  // });
}
function imgLink(track) {
  var fromTrack = imgLinkFromTrack(track);
  if (fromTrack) return fromTrack;

  querySpotifyForImage(function (data) {
    if (data && data.albums) {
      fromTrack = data.albums.items[0].images[1].url;
    } else {
      fromTrack = 'https://lastfm-img2.akamaized.net/i/u/64s/c6f59c1e5e7240a4c0d427abd71f3dbb';
    }
  }, track);
  return fromTrack;
}

function imgLinkFromTrack(track) {
  if (!track || !track.image || !track.image.length) return '';

  if (track.image.length > 2) return track.image[2]['#text'];

  return track.image[track.image.length - 1]['#text'];
}
