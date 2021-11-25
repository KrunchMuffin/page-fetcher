const args = process.argv.slice(2);
const url = args[0];
const path = args[1];
const request = require('request');
const fs = require('fs');

const fetchPage = (url, path, cb) => {
  request(url, {
        method: 'GET',
      },
      function(error, response, body) {
        // console.log(error, response, body);
        if (error) {
          return cb('Invalid response from server');
        }

        if (response.statusCode !== 200) {
          cb('Invalid response from server: ' + response.statusCode);
        }

        fs.writeFile(path, body, (err) => {
          if (err) {
            cb(err);
          }
          let data = {fileSize: fs.statSync(path).size};
          data.path = path;

          return cb('OK', data);
        });
      },
  );
};

const fetchResponse = (msg, data) => {
  console.log(msg);
  if (data) {
    console.log(' Downloaded and saved ' + data.fileSize + ' bytes to ' + data.path);
  }
  process.exit(1);
};

fetchPage(url, path, fetchResponse);
//
// console.log('error:', error); // Print the error if one occurred
// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// console.log('body:', body); // Print the HTML for the Google homepage.