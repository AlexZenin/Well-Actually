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

app.post('/process', function(req, res){

	var inputText = req.body.text;
	
	// Header information

	var azureEndpoints = ["sentiment", "keyPhrases"]
	// possible endpoints: "sentiment", "keyPhrases", "languages"

	var azureBody = JSON.stringify({
	  "documents": [
	    {
	      "id": "string",
	      "text": inputText
	    }
	  ]
	})

	const azureOptions = {
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

	var azureSentimentOptions = JSON.parse(JSON.stringify(azureOptions));
	var azureKeyPhrasesOptions = JSON.parse(JSON.stringify(azureOptions));

	azureSentimentOptions.url += "sentiment";
	azureKeyPhrasesOptions.url += "keyPhrases";

	// console.log(azureSentimentOptions.url);
	// console.log(azureKeyPhrasesOptions.url);

	// Main post request for processing data =

	var azureResponse = {
		sentiment: "",
		keyPhrases: []
	}

	// Start the sentiment request

	request(azureSentimentOptions, function (error, response, body) {
	    if (!error && response.statusCode == 200) {	       
	        // console.log("The id is: " + String(response.body.documents[0].score));
	        azureResponse.sentiment = response.body.documents[0].score;
	        // console.log(azureResponse.sentiment);
	    } else {
			console.log(error);
	    }
		

	    // Start keyPhrases the request

		request(azureKeyPhrasesOptions, function (error, response, body) {
		    if (!error && response.statusCode == 200) {		       
		        // console.log("The key values are: " + String(response.body.documents[0].keyPhrases));
		        azureResponse.keyPhrases = response.body.documents[0].keyPhrases;
		        // console.log(azureResponse.keyPhrases);
		    } else {
				console.log(error);
		    }
		
			res.end(JSON.stringify(azureResponse));
		
		})
	})
})



//********************/
// Start the app
//********************/

app.listen(app.get('port'), function() {
	console.log('Server running on port', app.get('port'))
})