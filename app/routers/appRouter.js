var passport = require('passport'),
    signupController = require('../controllers/signupController.js')

module.exports = function(express) {
  var router = express.Router()

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }
  
  router.get('/register', signupController.show)
  router.post('/register', signupController.signup)

  router.post('/login', passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/',
      failureFlash: true 
  }))

  router.get('/', function(req, res) {
    res.render('index.js')
  })

  router.get('/dashboard', isAuthenticated, function(req, res) {
    res.render('dashboard.js')
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  router.get('/guest', function(req, res){
  res.render('guest.jade')
  })

  return router
}