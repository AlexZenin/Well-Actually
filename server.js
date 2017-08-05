const express = require('express')
const app = express()

app.set('port', (process.env.PORT) || 8080 )

// Dummy Data

const source = [
	{
		"title": "Top 10 Anime Betrayals",
		"url": "http://apple.com"
	},
	{
		"title": "Another one",
		"url": "http://nyan.cat"
	}
]

// Routes

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
	app.use(express.static('public'))
})

app.get('/test', function(req, res) {
	res.end(JSON.stringify(source))
})

// Start the app

app.listen(app.get('port'), function() {
	console.log('Server running on port', app.get('port'))
})