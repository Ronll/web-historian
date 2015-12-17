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
        if( file === site){
          counter++;
          fs.readFile(__dirname + '/../test/testdata/sites/' +  file, function(err, siteHTML) {
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

  if(req.method === 'GET') {
    if(req.url === '/') {
      fs.readFile(__dirname + '/public/index.html', 'utf8', function (err, index) {
        res.writeHead(200, headers.headers);
        res.write(index);
        res.end();
      });
    }
    else{
      var site = handleSiteRequest(req.url.substring(1));

    }
  } else if (req.method === 'POST', function(data) {

      fs.readdir(__dirname + '/../test/testdata/sites', function (err, files) {
        var counter = 0;
        files.forEach(function (file) {
          if( file === data){
            counter++;
          }
        })
        if (counter === 0) {
          //We need to add the full site url to site.text
          fs.appendFile(__dirname + '/../test/testdata/sites.txt', data, function(err) {
            console.log(__dirname + '/../test/testdata/sites.txt')
            console.log('site', req.url.substring(1))
            if (err) {
              console.log("there was an error");
            }else {
              console.log("success!")
            }
          })
          //Notify user by switching the loading file
        }

      })
    }) {

  }

};
