//require runs all the code in modules and makes functions available
var bodyParser = require('body-parser'),
	express = require('express'),
	app = express(),
	cookieParser = require('cookie-parser'),
	jsonParser = bodyParser.json(),
    setupPassport = require('./app/setupPassport'),
    flash = require('connect-flash'),
    appRouter = require('./app/routers/appRouter.js')(express),
    session = require('express-session')
	
//uses jade for webpage rendering
app.set('view engine', 'jade')
app.locals.pretty = true;

//middleware
app.use(cookieParser())
app.use(session({ secret: '4564f6s4fdsfdhr', resave: false, saveUninitialized: false }))

app.use('/styles', express.static(__dirname + '/styles'))

app.use(flash())
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true }));

setupPassport(app);

/*app.get('/', function(req, res){
	res.render('index.jade');
});

app.get('/register', function(req, res){
	res.render('register.jade');
});

app.post('/register', function(req, res) {
	//res.json(req.body);
	var user = new Model.User({
		firstname: req.body.firstname,
		lastname: req.body.email,
		password: req.body.password
	});
	user
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
}); */

app.use('/', appRouter)

app.listen(3000);

module.exports.getApp = app