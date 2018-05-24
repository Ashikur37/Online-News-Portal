var express=require("express");
var router=express.Router();
var userModel = require.main.require('./models/users_model');
var loginModel=require.main.require('./models/login_model');
var catModel=require.main.require('./models/category_model');
var disModel=require.main.require('./models/district_model');
var newsModel=require.main.require('./models/news_model');

router.get("/reporter",function(req,res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
	res.render("reporter/home",{user:req.session.loggedUser});

});
router.get("/my_newses",function(req,res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
     var id=req.session.loggedUserID;

     newsModel.getNewsReporter(id,function(result){
          res.render('reporter/my_newses',{newses:result,user:req.session.loggedUser})

     });

});
router.get("/post_news",function(req,res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
     var clist;

    
     catModel.getAll(function(result){
          
          disModel.getAll(function(resl){
              var district=resl;
              var catlist=result;
              console.log(req.session.loggedDistrict+" is district");
          res.render('reporter/post_news', {
                    user: req.session.loggedUser,
                    catList: result,
                    disList: resl,
                    dis:req.session.loggedDistrict
               });
          });

     });
     

});
router.post("/post_news",function(req,res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
         
          var news={

          heading: req.body.head,
          details: req.body.details,
          cat: req.body.cat,
          district: req.body.dis,
          reporter:req.session.loggedUserID
     };
   
newsModel.insert(news,function(result){

          res.redirect("/reporter");
});

});

router.get('/deletes/:id', function(req, res){
     var id = req.params.id;
     newsModel.delete(id, function(result){
          
     });

     res.redirect('/my_newses');

});
router.get('/hides/:id', function(req, res){
     var id = req.params.id;
     newsModel.hide(id, function(result){
          
     });
     res.redirect('/my_newses');

});
router.get('/unhides/:id', function(req, res){
     var id = req.params.id;
     newsModel.unhide(id, function(result){
          
     });
     res.redirect('/my_newses');

});



module.exports=router;