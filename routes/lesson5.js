let express = require('express');
let cheerio = require('cheerio');
let superagent = require('superagent');
let eventproxy = require('eventproxy');
let url = require('url');
let async = require('async');

let app = express();
const cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl).end(function(err, res){
	if(err) {
		console.error(err);
	}
	let urlArray = [];
	let $ = cheerio.load(res.text);
	$("#topic_list .topic_title").each((index, element)=>{
		let href = url.resolve(cnodeUrl, $(element).attr('href'));
		urlArray.push(href);
	})
	
	let eq = new eventproxy();
	eq.after('all_resolve',urlArray.length , function(resArray) {
		  resArray = resArray.map((item)=> {
			let urlInfo = item[0];
			let elementInfo = item[1];
			let $ =  cheerio.load(elementInfo);
			return {
				title: $('.topic_full_title').text().trim(),
				href: urlInfo,
				comment1: $('.reply_content').eq(0).text().trim(),
			}
		})
		console.log(resArray)
	})

	urlArray.forEach((item, index)=> {
		superagent.get(item).end((err, resItem)=> {
			if(err) {
				console.error(err);
			}
			eq.emit('all_resolve', [item, resItem.text])
		})
	})

})
