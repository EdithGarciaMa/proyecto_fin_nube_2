/* const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      // Match Email's User
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Usuario No Encontrado." });
      } else {
        // Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Contraseña Incorrecta." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
*/



const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//const User = require('../models/user');
const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const user = await User.findOne({'email': email});
  if(user) {
    return done(null, false, req.flash('signupMessage', 'El email ya se encuentra registrado.'));
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    done(null, newUser);
  }  

 }));
  
passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
 
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'Email no Encontrado'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Password Incorrecto'));
  }
  done(null, user);

}));
