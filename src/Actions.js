var $ = require('jquery');
var spotifyQueries = {};

export function pullTracks (callback, user) {
  if (!user) {
    callback({error: true, message: "Enter a user", hideDisplay: true});
    return;
  }

  var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
   '&user=' + user + '&api_key=' + process.env.REACT_APP_SECRET_CODE + '&format=json&limit=20';

   $.ajax({
     method: 'Get',
     url: url,
     async: false
   }).done(data => {
     callback(data);
   });
}

export function querySpotifyForImage (callback, track) {
  var url = 'https://api.spotify.com/v1/search?q=' + track.album['#text'] +
   '&type=album';

  if (spotifyQueries[url]) return callback(spotifyQueries[url]);


  $.ajax({
    method: 'Get',
    url: url,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + process.env.REACT_APP_SPOTIFY_TOKEN
    }
  }).done(data => {
    spotifyQueries[url] = data;
    callback(data);
  });
}
