const rssParser = require('rss-parser')
const rssURL = 'http://feeds.nature.com/NatureNewsComment'

var articles = []
var relevant = []
var keywords = ['chimpanzees', 'cyber', 'drug']

function isRelevant(article) {
	for (index in keywords) {
		if (article.title.toLowerCase().indexOf(keywords[index]) > -1) {
			return true
		}
	}
	return false
}

rssParser.parseURL(rssURL, function(error, parsed) {
	parsed.feed.entries.forEach(function(entry) {
		articles.push({
			"title": entry.title,
			"url": entry.link
		})
	})
	relevant = articles.filter(isRelevant)
})