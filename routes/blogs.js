var express = require("express");
var router = express.Router();
var expressSanitizer = require("express-sanitizer");

var middleware = require("../middleware");

var Blog = require("../models/blog");   
var Comment = require("../models/comment");


router.use(expressSanitizer());

//INDEX PAGE

router.get("/index", function(req,res){

    //Get All Blogs from database.
    Blog.find({},function(err,allBlogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("blogs/index.ejs",{blogs : allBlogs, currentUser: req.user});
        }
    })
  
    
})


//NEW BLOG PAGE
router.get("/index/new", middleware.IsLoggedIn,function(req,res){
    res.render("blogs/new.ejs");
})

router.post("/index",middleware.IsLoggedIn,function(req,res){
  //get data from blogs array.

  console.log(req.user);

  req.body.description = req.sanitize(req.body.description);

  var isim = req.body.name;
  var resim = req.body.imageurl;
  var desc = req.body.description;
  var price = req.body.price;
  var author = {
      id: req.user._id,
      username : req.user.username

  };

 
  
  var newBlog = {name: isim , image: resim, price: price, description:desc,author:author, date: Date.now().toString() }

  
 
  //Create new blog and save to database.
  Blog.create(newBlog,function(err,newlyCreated){
      if(err){
          console.log(err);
      }
      else{
          console.log(newlyCreated.author.username);
          //redirect back to blogs page.
          res.redirect("/index");
      }
  })
  
    
 
});


//SHOW-Showing particular blog with given id.
router.get("/blogs/:id",function(req,res){

    //Find the blog with given id.
    Blog.findById(req.params.id).populate("comments").exec(function(err,foundBlog){
        if(err){
            console.log(err);
        }
        else{
            //render show template with that background
            console.log(foundBlog);
            res.render("blogs/show",{blog : foundBlog});
        }
    })


    //EDIT ROUTE
    router.get("/blogs/:id/edit",middleware.CheckBlogOwnership,function(req,res){

        

            Blog.findById(req.params.id,function(err,foundBlog){
            
             res.render("blogs/edit",{blog: foundBlog});
              
 
            })
       
       
    })


router.put("/blogs/:id",middleware.CheckBlogOwnership,function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //find and update blog.
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
        
        if(err){
            
            res.redirect("/index");
        }
        else{
            
            req.flash("success","Blog Edited Successfuly !");
            //Render show template with the founded blog.
            res.redirect("/blogs/"+updatedBlog._id);
        }
    })

})

router.delete("/blogs/:id",middleware.CheckBlogOwnership,function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err,blogRemoved){
        if(err){
            
            res.redirect("/index");
        }
        else{
            
            Comment.deleteMany( {_id: { $in: blogRemoved.comments } }, (err) => {
                if (err) {
                    console.log(err);
                }
                req.flash("success","Blog Deleted Successfuly !");
                console.log("Blog Deleted Succesfully");
                res.redirect("/index");
            });
          
        }
    }); 
})
   
})





module.exports = router;