var fs = require('fs');
var async = require('async');
var mkdirp = require('mkdirp');
var Handlebars = require('handlebars');
module.exports = function(args, done) {
  var page = args.page;
  var pages = args.pages;
  var cosmic = args.cosmic;
  var locals = {};
  async.series([
    function(callback) {
      fs.readFile(__dirname + '/layouts/page.html', 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        var template = Handlebars.compile(data);
        locals.template = template;
        callback();
      });
    },
    function() {
      // Set variables
      var year = (new Date()).getFullYear()
      var markup = locals.template({ page, pages, cosmic, year });
      // If Home page found
      if (page.slug === 'home') {
        fs.writeFile(__dirname + '/build-new/index.html', markup, function(err) {
          if(err) {
            return console.log(err);
          }
          done();
        });
      } else {
        mkdirp(__dirname + '/build-new/' + page.slug, function (err) {
          fs.writeFile(__dirname + '/build-new/' + page.slug + '/index.html', markup, function(err) {
            if(err) {
              return console.log(err);
            }
            done();
          });
        });
      }
    }
  ]);
}