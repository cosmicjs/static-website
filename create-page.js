var fs = require('fs')
var async = require('async')
var mkdirp = require('mkdirp')
var Handlebars = require('handlebars')
module.exports = (args, done) => {
  var page = args.page
  var pages = args.pages
  var cosmic = args.cosmic
  var locals = {}
  async.series([
    // Register partials
    callback => {
      fs.readFile(__dirname + '/layouts/partials/header.html', 'utf8', (err, data) => {
        if (err) {
          return console.log(err)
        }
        Handlebars.registerPartial('header', data)
        callback()
      })
    },
    callback => {
      fs.readFile(__dirname + '/layouts/partials/footer.html', 'utf8', (err, data) => {
        if (err) {
          return console.log(err)
        }
        Handlebars.registerPartial('footer', data)
        callback()
      })
    },
    callback => {
      fs.readFile(__dirname + '/layouts/page.html', 'utf8', (err, data) => {
        if (err) {
          return console.log(err)
        }
        var template = Handlebars.compile(data)
        locals.template = template
        callback()
      })
    },
    () => {
      // Set variables
      var year = (new Date()).getFullYear() // make your footer year dynamic ;) 
      var title = page.title
      var markup = locals.template({ page, pages, cosmic, year, title })
      // If Home page found
      if (page.slug === 'home') {
        fs.writeFile(__dirname + '/build-new/index.html', markup, err => {
          if(err) {
            return console.log(err)
          }
          done()
        })
      } else {
        mkdirp(__dirname + '/build-new/' + page.slug, err => {
          fs.writeFile(__dirname + '/build-new/' + page.slug + '/index.html', markup, err => {
            if(err) {
              return console.log(err)
            }
            done()
          })
        })
      }
    }
  ])
}