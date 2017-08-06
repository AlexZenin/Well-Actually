$(function() {

	$('#results').hide()

	$('#user_input').on('keyup', function(event) {
		if (event.keyCode == 13) {

			getResults()
		}
	})

	$('#submit').click(function(event) {

		getResults();
	})



	function getResults(){
			// Grab value from text box
			const url = $('#user_input').val()

			// Send the url to the server then parse the server's response
			$.post('/post', { url: url }, function(response) {
				const results = JSON.parse(response)

				$('#cards').show()
				$('#results').show()

				// Loop over results and display them
				for (index in results) {

					// Configure the tag with the right colour and sentiment value
					var articleSentiment = results[index].sentiment;
					var articleSentimentColour;
					if (articleSentiment < 0.33){
						articleSentimentColour = "red"
					} else if (articleSentiment > 0.66){
						articleSentimentColour = "green"
					} else {
						articleSentimentColour = "yellow"
					}

					var sentimentTag = '<div class="ui ' + articleSentimentColour + ' horizontal label">' + String((articleSentiment*100).toFixed(0)) + '</div>'

					$('#results').append('<div class="column"><div class="ui fluid card"><div class="image"><img src="' + results[index].imageURL + '"></div><div class="content"><a href="' + results[index].link + '" class="header">' + results[index].title + '</a><div class="description">' + results[index].content + '</div></div><div class="extra content"><span class="right floated">' + sentimentTag + '</span></div></div></div>')
				}
			})
	}
})