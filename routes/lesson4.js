let express = require('express');

let superagent = require('superagent');

let cheerio = require('cheerio');

let eventproxy = require('eventproxy');

let url = require('url');

let app = express();

let cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function(err, res) {
    if(err) {
      return console.error(err);
    }
    var topicUrls = [];
    let $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function (index, element) {
      let $element = $(element);
      let href = url.resolve(cnodeUrl, $(element).attr('href'));
      topicUrls.push(href);
    })

    console.log(topicUrls);



let ep = new eventproxy();
ep.after('topic_html', topicUrls.length, function(topics) {
  topics = topics.map(function(topicPair) {
    let topicUrl = topicPair[0];
    let topicHmtl = topicPair[1];
    var $ = cheerio.load(topicHmtl);
    return ({
      title: $('.topic_full_title').text().trim(),
      href: topicUrl,
      comment1: $('.reply_content').eq(0).text().trim(),
    });
  })
  console.log('final:');
  console.log(topics);
});

topicUrls.forEach(function(topicUrl) {
  superagent.get(topicUrl)
  .end(function(err, res) {
    if(err) {
      console.error(err);
    }
    console.log(`fetch${topicUrl}succrssful`);
    ep.emit('topic_html', [topicUrl, res.text])
  })
})
})