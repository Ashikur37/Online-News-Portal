var express=require("express");
var router=express.Router();
var userModel = require.main.require('./models/users_model');
var loginModel=require.main.require('./models/login_model');
var catModel=require.main.require('./models/category_model');
var disModel=require.main.require('./models/district_model');
var newsModel=require.main.require('./models/news_model');
var cmModel=require.main.require('./models/comments_model');
router.get("/news",function(req,res){
     var date=new Date();
          var mnth=date.getMonth()+1;
          if(mnth<10)
               mnth="0"+mnth;
          var dat=date.getDate();
          if(dat<10)
               dat="0"+dat;
     var dt=date.getFullYear()+"-"+mnth+"-"+dat+"%";
     newsModel.getAll(dt,function(result){
               console.log(result);
          res.render("news/home_user",{news: result,
               user:req.session.loggedUser});
     });
     
});
router.post("/date_searc",function(req,res){

          var dt=req.body.ds;
          var date=dt.split("/");
          date=date[2]+"-"+date[0]+"-"+date[1]+"%";
          
          newsModel.getAll(date,function(result){
          res.render("news/home_user",{news: result,
          user:req.session.loggedUser});
     });
     
});
router.post("/search",function(req,res){

          var key="%"+req.body.key+"%";
          
          newsModel.getAllSearch(key,key,key,function(result){
          res.render("news/home_user",{news: result,
          user:req.session.loggedUser});
     });
     
});
router.get("/:key",function(req,res){

          var key=req.params.key;
          
          newsModel.getCatSearch(key,function(result){
          res.render("news/home_user",{news: result,
          user:req.session.loggedUser});
     });
     
});
router.post("/comment",function(req,res){
     var cmt = {
          comment: req.body.cmnt,
          news: req.body.nid,
          cmntr:req.session.loggedUser 
     };

     cmModel.insert(cmt, function(result){
          
          res.redirect('/news');
     
     });

});
router.get('/admin/aprove/:id', function(req, res){
     var id = req.params.id;
     newsModel.aprove(id, function(result){
          
     });
     res.redirect('/admin/pending_news');

});
router.get('/admin/delete/:id', function(req, res){
     var id = req.params.id;
     newsModel.delete(id, function(result){
          
     });
     res.redirect('/admin');

});
router.get('/admin/hide/:id', function(req, res){
     var id = req.params.id;
     newsModel.hide(id, function(result){
          
     });
     res.redirect('/admin/aproved_newses');

});
router.get('/admin/unhide/:id', function(req, res){
     var id = req.params.id;
     newsModel.unhide(id, function(result){
          
     });
     res.redirect('/admin/aproved_newses');

});
router.get('/admin/makeReporter/:id', function(req, res){
     var id = req.params.id;
     newsModel.makeReporter(id, function(result){
          
     });
     res.redirect('/admin/view_users');

});
router.get('/admin/makeAdmin/:id', function(req, res){
     var id = req.params.id;
     newsModel.makeAdmin(id, function(result){
          
     });
     res.redirect('/admin/view_users');

});
router.get('/admin/block/:id', function(req, res){
     var id = req.params.id;
     newsModel.block(id, function(result){
          
     });
     res.redirect('/admin/view_users');

});
router.get('/admin/unblock/:id', function(req, res){
     var id = req.params.id;
     newsModel.unblock(id, function(result){
          
     });
     res.redirect('/admin/view_users');

});

router.get("/admin/pending_news",function(req,res){
      newsModel.getAproved(function(result){
          newsModel.getUnaproved(function(resul){
          res.render("admin/pending_news",{user:req.session.loggedUser,
               Aproved:result,
               unAproved:resul
          });
               
          });
          

     });
     

});
router.get("/admin/view_users",function(req,res){
    userModel.getAll(function(result){
     console.log(result[0]);
          res.render("admin/view_users",{user:req.session.loggedUser,
               userList:result
          });
    });
     

});
router.get("/admin/aproved_newses",function(req,res){
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