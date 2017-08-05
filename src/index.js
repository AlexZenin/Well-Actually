const articleParser = require('./parser')
const bodyParser = require('body-parser')
const imagifier = require('./imagifier')
const suggest = require('./suggest')
const express = require('express')
const path = require('path')
const app = express()

app.set('port', (process.env.PORT) || 8080 )

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
	app.use(express.static('public'))
})

app.post('/post', function(req, res) {
	// Pull the URL from the POST request
	const url = req.body.url

	// Get the article's text from the given URL
	articleParser(url, function(err, content) {
		const text = content

		// Get the keywords after passing the text to Azure's magicz
		const keywords = text.split(' ', 4)

		// Get a list of relevant articles given keywords then send it back to the client
		suggest(keywords, function(err, articles) {

			// Modify articles to have images
			imagifier(articles, function(err, suggestions) {
				
				// Finally, send it
				res.end(JSON.stringify(suggestions))
			})

		})

	})
})

app.listen(app.get('port'), function() {
	console.log('Running on http://localhost:' + app.get('port'))
})