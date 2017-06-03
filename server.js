var express = require('express');
var URL = require('url');
var app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/:query', (req, res) => {
  res.send(req.path);
  console.log(req.path);
});

app.listen(process.env.PORT || 3000);
