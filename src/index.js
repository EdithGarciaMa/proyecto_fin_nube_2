const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('express-session');
//conts flash = require('connect-flash');


//const app = express();

//require('./database');

//app.use(require('./routes/index.routes'))

//app.listen(3000);
//console.log('Servidor en puerto', 3000);


//import app from "./app";
//import "./database";

// Server is listening
//app.listen(app.get("port"));

//console.log("Server on port", app.get("port"));
//console.log("Environment:", process.env.NODE_ENV);



// Initializations
const app = express();
require('./database')
//createAdminUser();

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs",exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// middlewares
//app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
 //   store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);
//app.use(passport.initialize());
//app.use(passport.session());
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
app.use(indexRoutes);
app.use(userRoutes);
app.use(notesRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.render("404");
});

export default app;
