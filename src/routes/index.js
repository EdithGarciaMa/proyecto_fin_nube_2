const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get("/", (req, res) => {
    res.render('index'); //me manda al archivo index.hbs
});

/*router.get("/about", (req, res) => {
    res.render('about'); //me manda al archivo about.hbs
});

module.exports = router; */




//const express = require('express');
//const router = express.Router();


//router.get('/', (req, res, next) => {
//  res.render('index');
//});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});
/*
//todos las rutas debajo estaran dentro de la seguridad de las sessions
router.use((req, res, next)=>{
  isAuthenticated(req, res, next);
  next();
});
*/
router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/products',isAuthenticated, (req, res, next) => {
  res.send('products');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

module.exports = router;

//router.get('/', (req,res) => {
//    res.send('hello word')
//});

//module.exports = router;

//aqui puse el nuevo codigo


//const router = Router();

//router.get("/", renderIndex);
//router.get("/about", renderAbout);

//export default router;