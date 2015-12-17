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
    console.log('\nstart\n', index.length, '\n end of sites.txt');
  });

  

  //fs.dir --> go through each file 
  //return content of site.txt
  //expecting it to match the test array of urls
};

exports.isUrlInList = function() {
  //readListOfUrls --> returns the site.txt
  //traverse through this list of urls
  //if argument matches url
    //return true
  //else return false
};

exports.addUrlToList = function() {
  //if isURLInList() returns false
    //appendFile to sites.txt
  //otherwise do nothing
};

exports.isUrlArchived = function() {
  //if URL is in directory
    //return true
  //else
    //return false
};

exports.downloadUrls = function() {
  //if isURLArchived returns true
    //display archived URL
};
