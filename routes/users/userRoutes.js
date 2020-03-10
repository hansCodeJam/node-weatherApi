const express = require('express');
const router = express.Router()
const passport= require('passport')
const userController = require('./controllers/userController');
const userValidation = require('../validation/userValidation');;

router.get('/weather',userController.weatherApi)
router.get('/',userController.home)
router.get('/login', (req,res) => {
    res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/users/login',
    failureFlash: true
  })
);

router.get('/register', (req,res)=>{
    res.render('register')
  })

router.post('/register', userValidation, userController.register)
router.get('/logout',userController.logout)

module.exports = router;