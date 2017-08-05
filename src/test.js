const suggest = require('./suggest')

suggest(['the', 'test'], function(err, result) {

	console.log(result)

})