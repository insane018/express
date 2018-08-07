const express = require('express');

const superagent = require('superagent');

const cheerio = require('cheerio');

let app = express();

app.get('/', function(req, res, next) {
  superagent.get('https://cnodejs.org/')
  .end(function(err, sres) {
    if(err) {
      return next(err);
    }
    const $ = cheerio.load(sres.text);
    const items = [];
    $('#topic_list .topic_title').each(function (index, element) {
      var $element = $(element);
      items.push({
        title: $element.attr('title'),
        href: $element.attr('href')
      })
    })
    
    res.send(items);
  })
});

app.listen(3000, function(req, res) {
  console.log('app is listen at 3000 port');
})