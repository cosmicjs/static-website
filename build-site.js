var Metalsmith = require('metalsmith')
var markdown = require('metalsmith-markdown')
var layouts = require('metalsmith-layouts')
var permalinks = require('metalsmith-permalinks')
var sass = require('metalsmith-sass')
var Cosmic = require('cosmicjs')
var async = require('async')
var mkdirp = require('mkdirp')
var del = require('del')
var mv = require('mv')
var createPage = require('./create-page')
var config = require('./config')
module.exports = () => {
  async.series([
    // Create build-new folder
    callback => {
      mkdirp(__dirname + '/build-new', err => {
        callback()
      })
    },
    callback => {
      Cosmic.getObjects(config.cosmicjs, (err, res) => {
        var objects = res.objects.all
        var pages = res.objects.type.pages
        var cosmic = res
        // Create dynamic static pages
        async.eachSeries(pages, (page, callbackEach) => {
          var args = {
            page: page,
            pages: pages,
            cosmic: cosmic
          }
          createPage(args, callbackEach)
        }, () => {
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
            .build((err, files) => {
              if (err) { throw err }
              callback()
            })
        })
      })
    },
    // Delete build folder
    callback => {
      del([__dirname + '/build']).then(() => {
        callback()
      })
    },
    // Move build-new to build folder
    callback => {
      mv(__dirname + '/build-new', __dirname + '/build', { mkdirp: true }, () => {
        callback()
      })
    },
    // Delete build-new folder
    callback => {
      del([__dirname + '/build-new']).then(() => {
        // done
      })
    }
  ])
}