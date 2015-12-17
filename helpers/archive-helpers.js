var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {

  fs.readFile(exports.paths.list, 'utf8', function (err, urls) {
    var urlsArray = urls.split("\n");
    callback(urlsArray);
    // console.log('\nstart\n', index.length, '\n end of sites.txt');
  });
};

exports.isUrlInList = function(url, callback) {
  
  exports.readListOfUrls(function(urlsArray) {
      var counter = 0;
      for (var i = 0; i<urlsArray.length; i++) {
        if (url === urlsArray[i]) {
          counter++;
          callback(true);
        }
      }
      if (counter === 0) {
        callback(false); 
      }
  });
  //readListOfUrls --> returns the site.txt
  //traverse through this list of urls
  //if argument matches url
    //return true
  //else return false
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, function(is) {
    if (!is) {
      fs.appendFile(exports.paths.list, url + '\n', 'utf8', function (err, content){
        if (err) {
          console.log("there was an error");
        } else {
          console.log("success!", url + '\n');
          callback();
          // fs.readFile(__dirname + '/../test/testdata/sites.txt', 'utf8', function (err, index) {
          //   console.log('\nstart\n', index.length, '\n end of sites.txt');
          // });
        }
      });
    } else {
      callback();
    } 
  });
  //if isURLInList() returns false
    //appendFile to sites.txt
  //otherwise do nothing
};

exports.isUrlArchived = function(url, callback) {
  exports.isUrlInList(url, function(is) {
    if (is) {
      var counter = 0;
      fs.readFile(exports.paths.archivedSites, 'utf8', function (err, urls) {
        var urlsArray = urls.split("\n");
        for (var i = 0; i<urlsArray.length; i++) {
          if (url === urlsArray[i]) {
            counter ++;
            callback(true);
          }
        }
        if (counter === 0) {
          callback(false);
        }
      });
    } else {
      callback(false);
    }
  });
};

exports.downloadUrls = function(urls) {

  for (var i = 0; i<urls.length; i++) {
    exports.isUrlArchived(urls[i], function(exists) {
      if (exists) {
        //add to archived sites directory
        fs.writeFile(exports.paths.archivedSites + "/" + urls[i], urls[i], function (err){
          if (err) {
            console.log("there was an error");
          } else {
            console.log("success!", urls[i] + '\n');
            fs.appendFile

          }
        });

      }
    });
  }
};
