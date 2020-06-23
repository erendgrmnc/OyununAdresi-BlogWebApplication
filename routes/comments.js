var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

var Blog  = require("../models/blog"),
    Comment     = require("../models/comment");



router.get("/blogs/:id/comments/new",middleware.IsLoggedIn,function(req,res){
  
    //Find Blog By ID
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{blog:foundBlog});
        }
    })
  
   
})

router.post("/blogs/:id/comments",middleware.IsLoggedIn,function(req,res){
    //look blog with id
    Blog.findById(req.params.id,function(err,foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }
        else{
            //create new comment
            console.log(req.body.comment);
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }
                else{
                     //add username and id to comment
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     //connect comment to blog
                     comment.save();
                     foundBlog.comments.push(comment);
                     foundBlog.save();
                    
                     //redirect to blog show page

                     res.redirect("/blogs/"+foundBlog._id);

                }
            });




        }
    })
    
   

})


router.get("/blogs/:id/comments/:comment_id/edit",middleware.CheckCommentOwnerShip,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("../views/comments/edit",{blog_id : req.params.id,comment:foundComment});
        }
    })
    
})

router.put("/blogs/:id/comments/:comment_id",middleware.CheckCommentOwnerShip,function(req,res){

    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Comment Edited Successfuly !");
            res.redirect("/blogs/" +req.params.id);
        }
    })
})

router.delete("/blogs/:id/comments/:comment_id",middleware.CheckCommentOwnerShip,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            req.flash("success","Comment Deleted Successfuly !");
            res.redirect("/blogs/" +req.params.id);
        }
    })
})


module.exports = router;