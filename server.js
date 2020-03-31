var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    User        = require("./models/user"),
    Repair        = require("./models/repair"),
    session = require("express-session"),
    methodOverride = require("method-override");

// configure dotenv
require('dotenv').load();
// require('dotenv').config();

//middleware
const middleware = require("./middleware/index.js");
const { isLoggedIn } = middleware;
    
// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost/27017'; 

mongoose.connect(databaseUri, { useMongoClient: true })
      .then(() => console.log(`Database connected`))
      .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

//require moment
app.locals.moment = require('moment');

//passport config
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

//root route
app.get("/", function(req, res){
    res.render("landing");
});

//register routes
app.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username , phone: req.body.phone , first: req.body.first , last: req.body.last ,password: req.body.password});
    User.register(newUser, req.body.password , function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up!" + req.body.username);
           res.redirect("/"); 
        });
    });
});

//login routes
app.get("/login", function(req, res){
   res.render("login", {page: 'login'});
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Successfully Logged In!'
    }), function(req, res){
});

//logout route
app.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged Out!");
   res.redirect("/");
});

//admin routes
app.get("/admin",function(req,res) {

    Repair.find({}, function(err, allRepairData){
        if(err){
            console.log(err);
        } else {
           res.render("data",{allRepairData : allRepairData});
        }
     });
});


//user update routes
app.get("/user/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            // res.render("/");
            req.flash("error", "User Not Found!");
        } else {
            res.render("user", {userData: foundUser});
        }
    });
 });

app.put("/update/:id",function(req,res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
        if(err){
            req.flash("error", "Updation Failed!");
            res.redirect("/");
        }  else {
            res.redirect("/");
            req.flash("success", "Successfully Updated User!");
        }
     });
});

//repair routes
app.get("/repair",function(req,res){
    res.render("repair");
});

//data fetch routes
app.post("/repairdata",function(req,res) {

    Repair.create(req.body.data, function(err, data){
        if(err){
            req.flash("error", "Sending Data Failed!");
        }
        req.flash("success", "Successful Data Submission We'll Contact You Soon!");
        res.redirect("/");
    });
});

//sell routes
app.get("/sell",function(req,res){
    res.render("sell");
});

app.post("/selldata",function(req,res) {

});

//brands routes
app.get("/apple/",function(req,res){
    res.render("phones/apple");
});
app.get("/huawei",function(req,res){
    res.render("phones/huawei");
});
app.get("/lenovo",function(req,res){
    res.render("phones/lenovo");
});
app.get("/motorola",function(req,res){
    res.render("phones/motorola");
});
app.get("/nokia",function(req,res){
    res.render("phones/nokia");
});
app.get("/oneplus",function(req,res){
    res.render("phones/oneplus");
});
app.get("/oppo",function(req,res){
    res.render("phones/oppo");
});
app.get("/realme",function(req,res){
    res.render("phones/realme");
});
app.get("/samsung",function(req,res){
    res.render("phones/samsung");
});
app.get("/vivo",function(req,res){
    res.render("phones/vivo");
});
app.get("/xiaomi",function(req,res){
    res.render("phones/xiaomi");
});

//phone models routes
app.get("/apple/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Apple";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/huawei/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Huawei";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/lenovo/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Lenovo";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/motorola/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Motorola";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/nokia/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Nokia";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/oneplus/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="One Plus";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/oppo/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Oppo";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/realme/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Realme";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/samsung/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Samsung";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/vivo/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Vivo";
    res.render("cart",{modelname:modelname,brandname:brandname});
});
app.get("/xiaomi/:model",isLoggedIn,function(req,res){
    var modelname=req.params.model;
    var brandname="Xiaomi";
    res.render("cart",{modelname:modelname,brandname:brandname});
});


// listen
app.listen(4000, function(){
   console.log("The Server Has Started!");
});
// app.listen(process.env.PORT || 4000, function(){
//     console.log("The Server Has Started!");
//  });
 