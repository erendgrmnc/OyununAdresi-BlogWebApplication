var express = require("express");
var router = express.Router();

var passport = require("passport");

var User = require("../models/user");



//Register Route.

router.get("/register",function(req,res){
    res.render("register/register");
})

router.post("/register",function(req,res){

    var newUser = new User({username:req.body.username});
    
    User.register(newUser,req.body.password, function(err,user){
        if(err){
            req.flash("error",err.message + " !");
            console.log(err);
            res.redirect("/register");
        }

        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome To The YelpCamp " + user.username);
            console.log("User Registered ! " + user);
            res.redirect("/index");
        })
    });
})

//Login Route

router.get("/login",function(req,res){
    res.render("register/login");
});


router.post("/login",passport.authenticate("local",
{successRedirect:"/index",
failureRedirect:"/login"}),
function(req,res){    
    if(passport.isAuthenticated){
        req.flash("success","You Have Logged In Succesfuly !");
    }
    else{
        req.flash("error" ,"Failed To Login ! ");
    }
});

//Logout Route

router.get("/logout",function(req,res){
    req.flash("success","You Have Logged Out Successfuly !");
    req.logout();
    res.redirect("/index");
});

function IsLoggedIn(req,res,next){
    
    if(req.isAuthenticated()){
         return next();
    }

    res.redirect("/login");

}

module.exports = router;