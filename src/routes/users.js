const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

//const bcrypt = require('bcryptjs');

// Routes
router.get("/users/signin", (req, res) => {
    res.render('/users/signin');
});

router.post("/users/signin", passport.authenticate('local'), {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
});

router.get("/users/signup", (req, res) => {
    res.render('/users/signup');
});

router.post("/users/signup", async (req, res) => {
    const { name, email, password, confirm_password} = req.body;
    const errors = [];
    if(name.length <= 0) {
        errors.push({text: 'Porfavor Ingresa tu Nombre'})
    }
    if(password != confirm_password){
        errors.push({text: 'La Contraseña No Coincide'});
    }
    if(password.length < 3) {
        errors.push({text: 'La Contraseña debe ser Almenos de 3 Caracteres'});
    }
    if(errors.length > 0) {
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', 'El email ya Existe');
            req.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await nuewUser.save();
        req.flash('success_msg', 'Estas registrado');
        res.redirect('/users/signin');
    }
    //res.render('/users/signup');
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;

// Routes
//router.get("gnup/users/si", renderSignUpForm);

//router.post("/users/signup", singup);

//router.get("/users/signin", renderSigninForm);

//router.post("/users/signin", signin);

//router.get("/users/logout", logout);

//export default router;
