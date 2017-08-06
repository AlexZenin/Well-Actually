const bestImage = require('best-image')
const magix = require('./magix')

module.exports = function(articles, callback) {
	var final = []
	var total = 0

	articles.forEach(function(article) {
		bestImage.getBestImage(article.url, null, function(err, imgURL) {
			magix(article.title, function(err, azureResponse) {

				console.log('RUNNING AZURE FOR', article.title)

				final.push({
					'title': article.title,
					'link': article.url,
					'content': article.content,
					'imageURL': imgURL,
					'sentiment': (JSON.parse(azureResponse)).sentiment,
					'source': article.source
				})

				total += 1
				if (total >= articles.length) {
					return callback(null, final)
				}

			})
		})
	})
}