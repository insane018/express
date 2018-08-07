const express = require('express');

let app = express();

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(3000, function() {
  console.log('app is listening at port 3000');
});

// 解剖一下express的use逻辑，对峙http.createServer