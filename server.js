var express = require('express');
var URL = require('url');
var app = express();

var urlDictionary = {};
var port = process.env.PORT || 3000;

function isUrlValid(url) {
  var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  return regex.test(url);
}

function generateShortUrl(url) {
  var code = '' + Math.round(1000 + Math.random() * 9000);
  urlDictionary[code] = url;
  return code;
}

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/new/*', (req, res) => {
  var url = req.path.slice(5);
  var translation = {};
  if (isUrlValid(url)) {
    var code = generateShortUrl(url);
    translation.original_url = url;
    if (port != 3000) {
      translation.short_url = 'http://' + req.hostname + ':' + port + '/' + code;
    } else {
      translation.short_url = 'http://' + req.hostname + '/' + code;
    }
  } else {
    translation.error = "Not a valid url"
  }

  res.json(translation);
});

app.get('/:query', (req, res) => {
  var query = req.params.query;
  res.redirect(urlDictionary[query]);
})

app.listen(port);
