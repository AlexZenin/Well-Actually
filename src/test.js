const magix = require('./magix')

magix('hello world', function(err, result){
	console.log(result)
})