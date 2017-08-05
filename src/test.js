const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('port', (process.env.PORT) || 8080 )

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
	app.use(express.static('public'))
})

app.post('/post', function(req, res) {
	console.log(req.body)
	res.end(JSON.stringify(source))
})

app.listen(app.get('port'), function() {
	console.log('Running on http://localhost:' + app.get('port'))
})