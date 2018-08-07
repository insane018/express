const express = require('express');


const utility = require('utility');

let app = express();

app.get('/', function(req, res) {
  let q = req.query.q;
  let md5Value = utility.md5(q);

  res.send(md5Value);
})

app.listen(3000, function(req, res) {
  console.log('app is running at port 3000');
})