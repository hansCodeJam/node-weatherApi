const User = require('../models/Users');
const { validationResult } = require('express-validator');
const fetch = require('node-fetch')
const passport = require('passport')
const bcrypt = require('bcryptjs')
require('dotenv').config()
require('../../../lib/Passport')


module.exports = {
    register: (req, res, next) => {
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }

          User.findOne({email: req.body.email}).then((user) => {
            if (user) {
              return res.send('User Exists');
            } else {
              const newUser = new User();
        
              newUser.name = req.body.name;
              newUser.email = req.body.email;
              newUser.password = req.body.password;
        
          newUser.save().then(user => {
                req.login(user, err => {
                  if (err) {
                    return res
                      .status(400)
                      .json({ confirmation: false, message: err });
                  } else {
                    res.redirect('/');
                    next();
                  }
                });
              })
              .catch(err => {
                return next(err);
              });
          }
        })
}, 
 
weatherApi: (req,res)=>{

  if(req.isAuthenticated()) {
    
    cityName = req.query
    const apiKey = process.env.KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.cityName}&appid=${apiKey}&units=imperial`;
    fetch(url)
    .then((weather) => weather.json())
    .then((weather) => {
      return res.render('weatherApp',{weather})
    })
    .catch((err) => err)
   }
}, 

home:(req,res)=>{
  if(req.isAuthenticated()){
    res.render('home')
  }else{
    res.redirect('/users/login')
  }
}, 

logout:(req,res)=>{
        
  req.logOut()
  req.flash('successMessage','you are now logged out')
  return res.redirect('/users/login')
}

}