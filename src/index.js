const articleParser = require('./parser')
const bodyParser = require('body-parser')
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

	// Get the results after passing the text to Azure's magicz
	const results = ''

	// Send the results back to the client
	res.end(results)
})

app.listen(app.get('port'), function() {
	console.log('Running on http://localhost:' + app.get('port'))
})