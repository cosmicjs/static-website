var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var Cosmic = require('cosmicjs');
var async = require('async');
var mkdirp = require('mkdirp');
var del = require('del');
var mv = require('mv');
var createPage = require('./create-page');
module.exports = function() {
  async.series([
    // Clean
    function(callback) {
      mkdirp(__dirname + '/build-new', function (err) {
        callback();
      });
    },
    function(callback) {
      Cosmic.getObjects({ bucket: { slug: 'static-site' }}, function(err, res) {
        var objects = res.objects.all;
        var pages = res.objects.type.pages;
        var cosmic = res;
        // Create dynamic static pages
        async.eachSeries(pages, function(page, callbackEach) {
          var args = {
            page: page,
            pages: pages,
            cosmic: cosmic
          };
          createPage(args, callbackEach);
        }, function() {
          // Create markdown static pages
          Metalsmith(__dirname)
            .source('./src')
            .destination('./build-new')
            .clean(false)
            .use(sass({
              outputDir: 'css/',
              sourceMap: true,
              sourceMapContents: true
            }))
            .use(markdown())
            .use(permalinks())
            .use(layouts({
              engine: 'handlebars'
            }))
            .build(function(err, files) {
              if (err) { throw err; }
              callback();
            });
        });
      });
    },
    function(callback) {
      del([__dirname + '/build']).then(paths => {
        callback();
      });
    },
    function(callback) {
      mv(__dirname + '/build-new', __dirname + '/build', { mkdirp: true }, function(err) {
        callback();
      });
    },
    function(callback) {
      del([__dirname + '/build-new']).then(paths => {
        // done
      });
    }
  ]);
}