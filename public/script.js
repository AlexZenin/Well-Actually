$(function() {

	$('#results').hide()

	$('#submit').click(function(event) {

		// Grab value from text box
		const url = $('#user_input').val()

		// Send the url to the server then parse the server's response
		$.post('/post', { url: url }, function(response) {
			const results = JSON.parse(response)

			$('#results').show()

			// Loop over results
			for (index in results) {
				$('#results').append('<div class="ui segment"><a href="' + results[index].url + '">' + results[index].title + '</a></div>')
			}
		})
	})
})

