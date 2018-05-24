// declaration
var express = require('express');
var app = express();

// configure
app.set('view engine', 'ejs');

// use middlewares


// routes
app.get('/', function(req, res){
	//res.send('<form method="post"><input type="submit"/></form>');
	res.render('view');
});
app.post('/', function(req, res){
	res.send('<h2>Posted</h2>');
});

// server
app.listen(80, function(){
	console.log('Server started...');
});