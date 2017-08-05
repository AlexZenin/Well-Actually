const express = require('express')
const bodyParser = require("body-parser")
const http = require("http")
const request = require("request")
// require('request').debug = true
const querystring = require("querystring")
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

//********************/
// Azure api calls
//********************/

//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Header information

var azureEndpoint = "languages"

// possible endpoints: "sentiment", "keyPhrases", "languages"

var azureBody = JSON.stringify({
  "documents": [
    {
      "id": "string",
      "text": "string"
    }
  ]
})

var azureOptions = {
	url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/" + azureEndpoint,
	method: "POST",
	headers:{
		"Ocp-Apim-Subscription-Key": "13b99fb3f346435d863bc48b933d8ab6",
		"Content-Type": "application/json",
		"Host": "westus.api.cognitive.microsoft.com"
	},
	body: JSON.parse(azureBody),
	json: true
};

// Main post request for processing data 

app.post('/process', function(req, res){

	var text = req.body.text;

	console.log(text);

	// Start the request
	request(azureOptions, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        // Print out the response body
	        console.log(body)
	    } else {
			console.log(error);
	    }
	})


	res.end("Well done, you hit the enpoint!")
})



//********************/
// Start the app
//********************/

app.listen(app.get('port'), function() {
	console.log('Server running on port', app.get('port'))
})