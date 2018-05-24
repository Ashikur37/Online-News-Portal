var express=require("express");
var router=express.Router();
var userModel = require.main.require('./models/users_model');
var loginModel=require.main.require('./models/login_model');
var catModel=require.main.require('./models/category_model');
var disModel=require.main.require('./models/district_model');
var newsModel=require.main.require('./models/news_model');

router.get("/admin",function(req,res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
     newsModel.getUnaproved(function(result){
          res.render("admin/home",{user:req.session.loggedUser,
               unAproved:result.length
          });

     });
	

});
router.get("/dis_news",function(req,res){
     
     newsModel.getDN(function(result){
               console.log(result);
          res.render("admin/dis_report",{rs: result,
               user:req.session.loggedUser});
     });
     
});
router.get('/admin/aprove/:id', function(req, res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
     var id = req.params.id;
     newsModel.aprove(id, function(result){
          
     });
     res.redirect('/admin/pending_news');

});
router.get('/delete/:id', function(req, res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
     var id = req.params.id;
     newsModel.delete(id, function(result){
          
     });

     res.redirect('/aproved_newses');

});
router.get('/hide/:id', function(req, res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
     var id = req.params.id;
     newsModel.hide(id, function(result){
          
     });
     res.redirect('/aproved_newses');

});
router.get('/unhide/:id', function(req, res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
     var id = req.params.id;
     newsModel.unhide(id, function(result){
          
     });
     res.redirect('/aproved_newses');

});
router.get('/admin/makeReporter/:id', function(req, res){
     var id = req.params.id;
     newsModel.makeReporter(id, function(result){
          
     });
     res.redirect('/view_users');

});
router.get('/admin/makeAdmin/:id', function(req, res){
     var id = req.params.id;
     newsModel.makeAdmin(id, function(result){
          
     });
     res.redirect('/view_users');

});
router.get('/admin/block/:id', function(req, res){
     var id = req.params.id;
     newsModel.block(id, function(result){
          
     });
     res.redirect('/view_users');

});
router.get('/admin/unblock/:id', function(req, res){
     var id = req.params.id;
     newsModel.unblock(id, function(result){
          
     });
     res.redirect('/view_users');

});

router.get("/pending_news",function(req,res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
      newsModel.getAproved(function(result){
          newsModel.getUnaproved(function(resul){
          res.render("admin/pending_news",{user:req.session.loggedUser,
               Aproved:result,
               unAproved:resul
          });
               
          });
          

     });
     

});
router.get("/view_users",function(req,res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
    userModel.getAll(function(result){
     console.log(result[0]);
          res.render("admin/view_users",{user:req.session.loggedUser,
               userList:result
          });
    });
     

});
router.get("/aproved_newses",function(req,res){
     if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }
     newsModel.getAproved(function(result){
          newsModel.getUnaproved(function(resul){
          res.render("admin/aproved_newses",{user:req.session.loggedUser,
               Aproved:result,
               unAproved:resul
          });
               
          });
          

     });
     

});

router.get("/reporter/post_news",function(req,res){
     var clist;
   
     catModel.getAll(function(result){
          
          disModel.getAll(function(resl){
              var district=resl;
              var catlist=result;
          res.render('reporter/post_news', {
                    user: req.session.loggedUser,
                    catList: result,
                    disList: resl
               });
          });

     });
     

});
router.post("/reporter/post_news",function(req,res){
         
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





module.exports=router;