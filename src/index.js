const articleParser = require('./parser')
const bodyParser = require('body-parser')
const imagifier = require('./pureevil')
const suggest = require('./suggest')
const express = require('express')
const magix = require('./magix')
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

	console.log('URL SUCCESSFULLY SENT')

	// Get the article's text from the given URL
	articleParser(url, function(err, content) {
		const text = content

		console.log('ARTICLE SUCCESSFULLY PARSED')

		// Send it to the Azure api
		magix('hello world', function(err, azureResponse){

			console.log('TEXT SUCCESSFULLY MAGIXED')
		
			// Get the keywords after passing the text to Azure's magicz
			// const keywords = (JSON.parse(azureResponse)).keyPhrases
			const keywords = content.split(' ', 5)

			console.log('KEYWORDS', keywords)

			// Get a list of relevant articles given keywords then send it back to the client
			suggest(['the'], function(err, articles) {

				console.log('SUGGESTIONS SUCCESSFULLY SUGGESTED')

				// Modify articles to have images
				imagifier(articles, function(err, suggestions) {

					console.log('IMAGES SUCCESSFULLY ADDED')
					
					// Finally, send it
					res.end(JSON.stringify(suggestions))
				})

			})	

		})

	})
})

app.listen(app.get('port'), function() {
	console.log('Running on http://localhost:' + app.get('port'))
})