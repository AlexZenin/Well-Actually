const rssParser = require('rss-parser')
const bestImage = require('best-image')

const sources = [
	'http://feeds.nature.com/NatureNewsComment',
]

const options = {
	customFields: {
		item: ['content']
	}
}

module.exports = function (keywords, callback) {
	articles = []
	total = 0

	sources.forEach(function(source) {

		rssParser.parseURL(source, function(error, parsed) {
			parsed.feed.entries.forEach(function(entry) {
				articles.push({
					'title': entry.title,
					'url': entry.link,
					'content': entry.content,
					'imageURL': '',
					'source': parsed.feed.title
				})
			})

			relevant = articles.filter(function(article) {
				for (index in keywords) {
					if (article.content.toLowerCase().indexOf(keywords[index]) > -1) {
						return true
					}
				}
				return false
			})

			console.log(relevant)

			total += 1

			if (total >= sources.length) {
				return callback(null, relevant)
			}
		})

	})
}