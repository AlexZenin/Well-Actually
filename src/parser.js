const read = require('node-readability')
const strip = require('sanitize-html')

module.exports.parser = function(url) {
	read(url, function(error, article, meta) {
		const text = strip(article.content, { allowedTags: [] })
		return text
	})
}