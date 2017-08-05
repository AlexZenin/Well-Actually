const bestImage = require('best-image')

module.exports = function(articles, callback) {
	var final = []
	var total = 0

	articles.forEach(function(article) {
		bestImage.getBestImage(article.url, null, function(err, imgURL) {
			final.push({
				'title': article.title,
				'url': article.url,
				'content': article.content,
				'imageURL': imgURL
			})

			total += 1
			if (total >= articles.length) {
				return callback(null, final)
			}
		})
	})
}