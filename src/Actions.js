var $ = require('jQuery');

var api = '';
var defaultUser = 'aluhadora';

export function pullTracks (callback) {
  var url = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks' +
   '&user=' + defaultUser + '&api_key=' + api + '&format=json&limit=5';

   $.ajax({
     method: 'Get',
     url: url,
     async: false,
   }).done(data => {
     callback(data);
   });
}
