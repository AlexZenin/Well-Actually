const articleParser = require('./parser')
const bodyParser = require('body-parser')
const suggest = require('./suggest')
const express = require('express')
const app = express()

app.set('port', (process.env.PORT) || 8080 )

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
	app.use(express.static('public'))
})

app.post('/post', function(req, res) {
	// Pull the URL from the POST request
	const url = req.body.url

	// Get the article's text from the given URL
	const text = articleParser(url)

	// Get the keywords after passing the text to Azure's magicz
	const keywords = ['banana', 'animal']

	// Get a list of relevant articles given keywords then send it back to the client
	suggest(keywords, function(err, articles) {
		res.end(articles)
	})
})

app.listen(app.get('port'), function() {
	console.log('Running on http://localhost:' + app.get('port'))
})