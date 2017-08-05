const read = require('node-readability')
const strip = require('sanitize-html')

module.exports = function (url, callback) {
	read(url, function(error, article, meta) {
		const text = strip(article.content, { allowedTags: []})
		return callback(null, text)
	})
}