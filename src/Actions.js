var $ = require('jQuery');

var api = '';
var defaultUser = 'aluhadora';

export function pullTracks (callback, user) {
  if (!user) user = defaultUser;

  var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
   '&user=' + user + '&api_key=' + api + '&format=json&limit=5';

   $.ajax({
     method: 'Get',
     url: url,
     async: false
   }).done(data => {
     callback(data);
   });
}

export function user () {
  return defaultUser;
}
