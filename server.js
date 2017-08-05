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

var azureEndpoints = ["sentiment", "keyPhrases"]

// possible endpoints: "sentiment", "keyPhrases", "languages"

// Body of the request

var azureBody = JSON.stringify({
  "documents": [
    {
      "id": "string",
      "text": "string"
    }
  ]
})

var azureOptions = {
	url: "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/",
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

	console.log("The body of the request is: " + text);

	var azureResponse = {
		sentiment: 0,
		keyPhrases: []
	}

	// Sentiment request

	var azureSentimentRequest = azureOptions
	azureSentimentRequest.url += azureEndpoints[0]

	request(azureSentimentRequest, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        // Print out the response body
	        azureResponse.sentiment = body.documents[0].score;
	        console.log("Body of the sentiment request: " + body)
	    } else {
			console.log(error);
	    }
	})


	// Keywords request

	var azureKeyPhrasesRequest = azureOptions
	azureKeyPhrasesRequest.url += azureEndpoints[1]

	request(azureKeyPhrasesRequest, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        // Print out the response body
	        azureResponse.keyPhrases = body.documents[0].keyPhrases
	        console.log("Body of the body request: " + body)
	    } else {
			console.log(error);
	    }
	})

	// Return the sentiment and the key words

	res.end(JSON.stringify(azureResponse))
})



//********************/
// Start the app
//********************/

app.listen(app.get('port'), function() {
	console.log('Server running on port', app.get('port'))
})