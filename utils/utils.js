const request = require('request');
const key = require ('../config.js');

/*
make a function that makes a request to the ebird that obtains all of the recent sitings for birds
in the metro new orleans area

*/
/*TODO
Set env key for ebird call;
*/

const eBird = (callback) => {
  const options = {
    headers: {
      'X-eBirdApiToken': key.ebirdKEY,
    },
  };
  request('https://ebird.org/ws2.0/data/obs/US-LA-071/recent', options, (err, response, body) => {
    if (err) {
      console.error(err);
    } callback(err, response, body);
  });
};

module.exports.eBird = eBird;
