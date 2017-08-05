$(function() {

	$('#results').hide()

	$('#submit').click(function(event) {

		// Grab value from text box
		const url = $('#user_input').val()
		console.log(url)

		// Display result from server
		$.get('/test', function(data) {

			// Parse GET request
			const results = JSON.parse(data)

			$('#results').show()

			// Loop over results
			for (index in results) {
				$('#results').append('<div class="ui segment"><a href="' + results[index].url + '">' + results[index].title + '</a></div>')
			}

		})
	})
})

