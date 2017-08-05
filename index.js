const express = require('express')
const app = express()
const server = require('http').createServer(app)

server.listen(8080)
app.get('/', function(req, res) {
	res.sendFile(__dirname+'/index.html')
	app.use(express.static('public'))
})
console.log('Server started. Connect @ http://localhost:8080')