---
title: Documentation
date: 2016-10-25
layout: markdown.html
---

This is some documentation powered by Markdown.

Here's a block of code:
```bash
$ cd awesome
$ yarn
```
Here's another block of code:
```javascript
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
      var markup = locals.template({ page, pages, cosmic, year })
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
```