const rssParser = require('rss-parser')

const sources = [
	'http://feeds.nature.com/NatureNewsComment',
	'http://www.snopes.com/feed/',
	'https://www.sciencedaily.com/rss/all.xml',
	'http://www.abc.net.au/news/feed/52278/rss.xml'
]

module.exports = function (keywords, callback) {
	articles = []

	rssParser.parseURL(sources[0], function(error, parsed) {
		parsed.feed.entries.forEach(function(entry) {
			articles.push({
				'title': entry.title,
				'url': entry.link
			})
		})

		relevant = articles.filter(function(article) {
			for (index in keywords) {
				if (article.title.toLowerCase().indexOf(keywords[index]) > -1) {
					return true
				}
			}
			return false
		})

		return callback(null, relevant)
	})
}