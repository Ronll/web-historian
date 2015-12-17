var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var headers = require('./http-helpers.js')
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //if (req.method === 'OPTIONS') {
  //  var headers = defaultCorsHeaders;
  //  var statusCode = 200;
  //  response.writeHead(statusCode, headers);
  //  response.end();
  //}
  var handleSiteRequest = function (site) {

    var result;

    console.log("what is the input", site)
    fs.readdir(__dirname + '/../test/testdata/sites', function (err, files) {
      console.log(files, 'error:', err);
      var counter = 0;
      files.forEach(function (file) {
        if (file === site) {
          counter++;
          fs.readFile(__dirname + '/../test/testdata/sites/' + file, function (err, siteHTML) {
            res.writeHead(200, headers.headers);
            res.write(siteHTML);
            res.end();
          });
        }
      })
      if (counter === 0) {
        res.writeHead(404, headers.headers);
        res.end();
      }


    });
    console.log("this is the result", result)
    return result;
  };

  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, index) {
        res.writeHead(200, headers.headers);
        res.write(index);
        res.end();
      });
    }
    else {
      var site = handleSiteRequest(req.url.substring(1));

    }
  } else if (req.method === 'POST') {
    var data = [];
    req.on('data', function (chunk) {
      data.push(chunk);
    });

    req.on('end', function () {
      data = Buffer.concat(data).toString();
      data = data.substring(4);
      console.log("data is ", data.length, typeof data);


      fs.readdir(__dirname + '/../test/testdata/sites', function (err, files) {
        var counter = 0;
        files.forEach(function (file) {
          if (file === data) {
            counter++;
          }
        });
        console.log(counter, 'counter')

          //We need to add the full site url to site.text
          fs.appendFile( __dirname + '/../test/testdata/sites.txt', data + '\n', function (err) {
            if (err) {
              console.log("there was an error");
            } else {
              console.log("success!", data + '\n');
                fs.readFile(__dirname + '/../test/testdata/sites.txt', 'utf8', function (err, index) {
                  console.log('\nstart\n', index.length, '\n end of sites.txt')
                })
            }
          });
          //Notify user by switching the loading file
      })
    });

    res.writeHead(302, headers.headers);
    res.end();


  }

};
