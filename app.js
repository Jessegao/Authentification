//require runs all the code in modules and makes functions available
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.set('view engine', 'jade');
app.locals.pretty = true;

//middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
	res.render('index.jade');
});

app.get('/register', function(req, res){
	res.render('register.jade');
});

app.post('/register', function(req, res) {
	res.json(req.body);
})

app.get('/guest', function(req, res){
	res.render('guest.jade')
})

app.get('/login', function(req, res){
	res.render('login.jade');
});

app.get('/dashboard', function(req, res){
	res.render('dashboard.jade');
});

app.get('/logout', function(req, res){
	res.redirect('/');
}); 

app.listen(3000);
