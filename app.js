var express= require("express");

var app = express();

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var methodOverride = require("method-override");

var passport = require("passport");

var localStrategy = require("passport-local");

var Blog = require("./models/blog");

var seedDb = require("./seeds");

var User = require("./models/user");

var Comment = require("./models/comment");

var flash = require("connect-flash");


var blogRoutes = require("./routes/blogs"),
    commentsRoutes =   require("./routes/comments"),
    authRoutes     =   require("./routes/index");

app.use(express.static(__dirname+"/public"));    
//Seed Database.    
seedDb();

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret:"YelpCamp v3.0",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

mongoose.connect("mongodb://localhost/blog_app", {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err)
       console.error(err);
    else
       console.log("Connected to the mongodb"); 
  });






app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(function(req,res,next){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success"); 
        next();
})




app.get("/", function(req,res){

    res.render("landing");
})

app.use(blogRoutes);
app.use(commentsRoutes);
app.use(authRoutes);



var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});