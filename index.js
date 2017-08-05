const express = require('express')
const app = express()
const server = require('http').createServer(app)

server.listen(8080)

const sources = [
	{ 
		"title": "Top 10 Anime Betrayals",
		"url": "http://nyan.cat"
	}
]

app.get('/test', function(req, res) {
	res.end(JSON.stringify(sources))
})

console.log('Server started. Connect @ http://localhost:8080')