$(function() {

	$('#results').hide()

	$('#submit').click(function(event) {

		// Grab value from text box
		const url = $('#user_input').val()

		// Send the url to the server then parse the server's response
		$.post('/post', { url: url }, function(response) {
			const results = JSON.parse(response)

			$('#results').show()

			// Loop over results and display them
			for (index in results) {
				$('#results').append('<div class="column"><div class="ui fluid card"><div class="image"><img src="' + results[index].imageURL + '"></div><div class="content"><a href="' + results[index].title + '" class="header">' + results[index].title + '</a><div class="description">' + results[index].content + '</div></div><div class="extra content"><span class="right floated">DATE</span><span><i class="user icon"></i>' + results[index].source + '</span></div></div></div>')
			}
		})
	})
})