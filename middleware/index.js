//Middlewares
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.CheckBlogOwnership = function(req,res,next){
        var aga = req.isAuthenticated();
            //is user logged in.
            
            if(aga == true){
              
                Blog.findById(req.params.id,function(err,foundBlog){
                   
                    if(err){
                        req.flash("error","Blog Not Found !");
                        res.redirect("back");
                    }
    
                    //does user own the blog
                    else{           
                        if(foundBlog.author.id.equals(req.user._id) || req.user.isAdmin == true){
                            
                            next();
                        }
                         //otherwise,redirect. 
                        else{
                            req.flash("You Don't Have Permission To Do That !");
                            res.redirect("back");
                        }
                        
                    }
                })
    
            }
              //if not,redirect.
            else{
                req.flash("error","You Need To Be Logged In To Do That !");
                res.redirect("back");
            }
    }

middlewareObj.CheckCommentOwnerShip = function(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    req.flash("error","Comment Not Found !");
                    console.log(err);
                    res.redirect("back");
                }
                else{
                    if(foundComment.author.id.equals(req.user.id) || req.user.isAdmin()){
                        next();
                    }
                    else{
                        req.flash("error","You Don't Have Permission To Do That !");
                        res.redirect("back");
                    }
                }
            })
            
        }
    
        else{
            req.flash("error","You Need To Be Logged In To Do That !");
            res.redirect("back");
        }
    }

middlewareObj.IsLoggedIn = function(req,res,next){
    
    if(req.isAuthenticated()){
         req.flash("success","You Have Logged In Successfuly !");
         return next();
    }

    req.flash("error","Please Login First !");
    res.redirect("/login");

}

middlewareObj.IsAdmin = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.isAdmin()){

            return next();
        }

        else{

            req.flash("error","You don't Have Permission To Do That");
            res.redirect("back");

        }
    }
}


module.exports = middlewareObj;