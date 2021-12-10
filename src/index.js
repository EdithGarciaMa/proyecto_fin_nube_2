/*const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Initializations
const app = express();
require('./database')
require('./config/passport');
//createAdminUser();

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
//app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// static files
app.use(express.static(path.join(__dirname, "public")));

//server listening
app.listen(app.get('port'), () => {
  console.log('Servidor en puerto', app.get('port'))
}); */




const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


//Inicializaciones
const app = express();
require('./database');
require('./config/passport');
//require('./passport/local-auth');

// Settings
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.listen(3000);

//Middlewears
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'misesionsecreta',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  //console.log(app.locals)
  next();
});

//Routes
app.use('/', require('./routes/index'));
app.use(require('./routes/notes'));

// static files
app.use(express.static(path.join(__dirname, "public")));

//Incio de servidor 
console.log('SERVIDOR EN PUERTO',3000);
