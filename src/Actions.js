var $ = require('jQuery');

var api = '888f48f85285e39075b7e1a461863d81';
var defaultUser = 'aluhadora';

export function pullTracks (callback, user) {
  if (!user) user = defaultUser;

  var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
   '&user=' + user + '&api_key=' + api + '&format=json&limit=20';

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
