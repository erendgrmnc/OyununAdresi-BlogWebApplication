var mongoose   = require("mongoose"),
    Blog = require("./models/blog"),
    Comment    = require("./models/comment"),
    User       = require("./models/user");




    
    

    function seedDb(){

        var data = [
            {name: "Salmon Creek",image: "https://i4.hurimg.com/i/hurriyet/75/1110x740/5b6ac3a55379fe0148ebc024.jpeg",description: "Est eiusmod Lorem ipsum pariatur id sit excepteur consectetur fugiat nisi anim. Occaecat laboris quis consequat eiusmod cupidatat sint sit Lorem Lorem deserunt velit deserunt. Laboris est aute non deserunt esse magna veniam laborum eiusmod anim non pariatur. Sit cillum non incididunt consectetur aliquip eu officia et. Est enim et amet nulla laboris ipsum veniam occaecat dolore nisi non aliquip. Veniam fugiat do commodo aliqua cupidatat anim occaecat magna consequat velit excepteur. Sint nostrud occaecat ut exercitation laboris magna et esse duis mollit occaecat consequat."},
            {name: "Hello From Ohaio !",image: "https://kampbros.com/wp-content/uploads/2019/11/kas-marim-kamp-alani-kampbros-53-700x467.jpg", description: "Ipsum ipsum proident Lorem ipsum. Mollit aliquip tempor ut sunt elit cillum mollit culpa non ad irure. Amet et exercitation exercitation do aute aute aliquip excepteur ea in dolor. Ad do dolore amet id nulla sit. Ullamco labore reprehenderit in deserunt magna sit consequat quis sunt ipsum sit non cillum. Nisi elit do laborum adipisicing adipisicing nulla esse eu laborum. Qui dolore eiusmod fugiat deserunt."},
            {name: "Panzers",image: "https://sosyola.com/wp-content/uploads/2019/06/mersin-ucretsiz-kamp-780x470.jpg", description: "Cillum sunt non magna adipisicing proident non dolor excepteur magna mollit ad velit. Deserunt velit sunt exercitation ipsum consectetur sunt. Sit officia voluptate laboris eiusmod. Dolore incididunt mollit in culpa aliqua pariatur duis exercitation esse esse cupidatat cupidatat. Culpa minim sunt ex nulla consectetur duis culpa mollit Lorem nostrud sint adipisicing Lorem labore."},
            {name: "Geisha Inn",image: "https://cdn.yemek.com/mncrop/500/333/uploads/2015/06/kamp-alanlari.jpg"}
        ]

     
        

   //REMOVE CAMPGROUNDS
   //Campground.remove({},function(err){
   //    if(err){
   //        console.log(err);
   //    }
   //    else{
   //        console.log("Campground Data Cleaed successfuly");

   //           //ADD CAMPGROUNDS
   //          data.forEach(function(seed){
   //          Campground.create(seed,function(err,campground){
   //          if(err){
   //            console.log(err);
   //          }
   //          else{
   //            console.log("Campground Added !");
   //            //CREATE COMMENTS
   //               Comment.create({
   //                   text:"Great Place !",
   //                   author:"Barney"
   //               }, function(err,comment){
   //                   if(err){
   //                       console.log(err);
   //                   }
   //                   else{
   //                       campground.comments.push(comment);
   //                       campground.save();
   //                       console.log("Comment Added !");
   //                       
   //                   }
   //               })

   //                }
   //             })
   //         })
   //    }
            
 
         
    }

   

    //ADD COMMENTS

    module.exports = seedDb;
 