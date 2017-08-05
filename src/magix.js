const bodyParser = require("body-parser")
const request = require("request")

module.exports = function(inputText, callback) {
	var azureEndpoints = ["sentiment", "keyPhrases"]

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

			return callback(null, JSON.stringify(azureResponse))
		
		})
	})
		

}


// Header information

// possible endpoints: "sentiment", "keyPhrases", "languages"





// Start the sentiment request