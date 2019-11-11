var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    // Campground  = require("./models/campground"),
    // Comment     = require("./models/comment"),
    User        = require("./models/user"),
    session = require("express-session"),
    // seedDB      = require("./seeds"),
    methodOverride = require("method-override");
// configure dotenv
require('dotenv').load();

//requiring routes
// var commentRoutes    = require("./routes/comments"),
    // campgroundRoutes = require("./routes/campgrounds"),
var indexRoutes      = require("./routes/index");
    
// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/fiks';

mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
//require moment
app.locals.moment = require('moment');
// seedDB(); //seed the database
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is a secret key : 7678678uykdfyu56d47865dchjvjhdc",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});


app.use("/", indexRoutes);
// app.use("/campgrounds", campgroundRoutes);
// app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
   console.log("The Server Has Started!");
});