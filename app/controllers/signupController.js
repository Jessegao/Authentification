var bcrypt = require('bcrypt'),
    Model = require('../model/models.js')

module.exports.show = function(req, res) {
  res.render('register.js')
}

module.exports.register = function(req, res) {
  var firstname = req.body.firstname
  var lastname = req.body.lastname
  var password = req.body.password
  var email = req.body.email
  
  if (!firstname || !lastname || !password || !email) {
    req.flash('error', "Please, fill in all the fields.")
    res.redirect('register')
  }
  
  var salt = bcrypt.genSaltSync(10)
  var hashedPassword = bcrypt.hashSync(password, salt)
  
  var newUser = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    salt: salt,
    password: hashedPassword
  }
  
  Model.User.create(newUser).then(function() {
    res.redirect('/')
  }).catch(function(error) {
    req.flash('error', "Please, choose a different email.")
    res.redirect('/register')
  })
}