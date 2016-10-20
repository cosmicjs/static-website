var buildSite = require('./build-site');
buildSite();
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('build'));
app.get('/rebuild-site', function (req, res) {
  buildSite();
  res.end('Site rebuilt ' + new Date() + '!');
});
app.post('/rebuild-site', function (req, res) {
  buildSite();
  res.end('Site rebuilt ' + new Date() + '!');
});
app.get('*', function (req, res) {
  res.redirect('/404');
});
app.listen(app.get('port') || 3000, function () {
  console.info('==> 🌎  Go to http://localhost:%s', app.get('port'))
});