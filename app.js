var buildSite = require('./build-site')
buildSite()
var express = require('express')
var app = express()
app.set('port', process.env.PORT || 3000)
app.use(express.static('build'))
app.get('/rebuild-site', (req, res) => {
  buildSite()
  res.end('Site rebuilt!')
})
app.post('/rebuild-site', (req, res) => {
  buildSite()
  res.end('Site rebuilt!')
})
app.get('*', (req, res) => {
  res.redirect('/404')
})
app.listen(app.get('port') || 3000, () => {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'))
})