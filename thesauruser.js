/////////////////
// Thesauruser //
/////////////////

var express = require('express'),
	app     = express(),
	request = require('request'),
	apiKey  = require('fs').readFileSync('api_key.txt', 'utf8');

app.use(express.static('build/'));

// Shows you your key
console.log('Your API key is: ' + apiKey);

app.get('/api/thesaurus/:word', function(req, res, next) {
	var word = req.params.word,
		url;

	if(req.xhr) {

		url = "http://words.bighugelabs.com/api/2/"+ apiKey +"/"+ word +"/json";
		request(url, function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var words,
					obj = JSON.parse(body);

				if(obj.noun) {
					words = obj.noun.syn;
				} else if(obj.adjective) {
					words = obj.adjective.syn;
				} else if(obj.verb) {
					words = obj.verb.syn;
				} else {
					res.status(500).json({
						status: 500,
						message: "There's been an issue with the API,"+
						" please contact me on GitHub using the "+
						"button at the top, and report the "+
						"word you entered, thanks!"
					})
					return;
				}

				res.status(200).json({
					status: 200,
					message: 'Success',
					words: words
				})
			} else if(response.statusCode === 404) {
				res.status(response.statusCode).json({
					status: response.statusCode,
					message: error || 'No results found for that word'
				})
			} else if(error) {
				res.status(response.statusCode).json({
					status: response.statusCode,
					message: error
				})
			}
		})
	} else {
		res.status(403).json({
			status: 403,
			message: 'API can only be accessed using AJAX'
		})
	}
})

// Other Routes

app.get('/api/*', function(req, res, next) {
	res.status(501).json({
		status: 501,
		message: 'API route not implemented'
	})
})

app.get('*', function(req, res, next) {
	res.status(404).send('404 Bitch')
})

app.listen(8008);
