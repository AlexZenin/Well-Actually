var articles = [
	{
		"title": "test trump",
		"url": "http://nyan.cat"
	},
	{
		"title": "no",
		"url": "http://ha.com"
	}
]

var keywords = ['trump', 'ha']

function isRelevant(article) {
	for (index in keywords) {
		if (article.title.indexOf(keywords[index]) > -1) {
			return true
		}
	}
	return false
}

var relevant = articles.filter(isRelevant)

console.log(relevant)


