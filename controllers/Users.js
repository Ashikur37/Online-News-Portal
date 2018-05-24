var express=require("express");
var router=express.Router();
var userModel = require.main.require('./models/users_model');
var disModel = require.main.require('./models/district_model');
var loginModel=require.main.require('./models/login_model');
router.get("/signup",function(req,res){

	disModel.getAll(function(result){
          var data={errors: []};
		res.render("user/signup",{dis:result,data,perror:""});

	});

});
router.get("/logout",function(req,res){ 
          req.session.destroy();   
         res.redirect("/login");
     
});
router.get("/change_password",function(req,res){  
if(! req.session.loggedUser)
     {
          res.redirect('/login');
          return;
     }   
          users=req.session.loggedUser;
          loginModel.get_pass(users,function(result){
               
         res.render("User/change_password",{dt: result,
          user:req.session.loggedUser,error:""});
     });
     
});
router.post("/change_password",function(req,res){     
          users=req.session.loggedUserID;
          var old=req.body.old;
          var pass=req.body.pass;
          loginModel.get_pass(users,function(result){
           var oldp=result[0].Password;
           

           if(oldp.localeCompare(old)!=0)
           {
               res.render("User/change_password",{dt: result,
          user:req.session.loggedUser,error:"Wrong old passwoed"});
           }
           else
           {
               
               var id=req.session.loggedUserID;
              
               loginModel.updatepass(id,pass,function(result){
                    var tp=parseInt(req.session.type);
                     if(tp==0)
                    {
                    
                    res.redirect("/news");   
                    }
                    if(tp==1)
                    {
                    res.redirect("/reporter");
                         

                    }
                     if(tp==2)
                    {
                         res.redirect("/admin");

                    } 
                        
               });
           }
          });

         
         
     
});
router.post("/signup",function(req,res){
     req.checkBody('uname', 'Username is required').notEmpty();
     req.checkBody('email', 'Email is required').notEmpty();
     req.checkBody('mobile', 'Mobile is required').notEmpty();
     req.checkBody('email', 'Email is not valid').isEmail();
     
     var pass=req.body.pass;
     var rpass=req.body.rpass;
     var perror="";
     if(pass.localeCompare(rpass))
        perror="passwords doesnt match";  
     req.getValidationResult().then(function(result){
     if(!result.isEmpty())
          {    
               var data = {errors: result.array()};
               disModel.getAll(function(resul){
               res.render('user/signup', {dis:resul,data,perror});
          });
          }
     else
     {
          var user = {
          username: req.body.uname,
          email: req.body.email,
          mobile: req.body.mobile,
          password: req.body.pass,
          district: req.body.dis,
          type: 0
     };

     userModel.insert(user, function(result){
          loginModel.insert(user, function(result){
          res.redirect('/login');
     });
     });

     }               


     });
	

});
router.get("/login",function(req,res){

	res.render("user/Signin");
});
router.post("/login",function(req,res){

     var user={

     	username: req.body.uname,
		password: req.body.pass
     };
     loginModel.check(user,function(result){
     		if(result.length>0)
     		{
     			var id=result[0].User_ID;
     			userModel.get(id,function(resul){
     				req.session.loggedUser = user.username;
                         req.session.type=result[0].Type;
     			req.session.loggedUserID = result[0].User_ID;
     			req.session.loggedDistrict=resul[0].district;
     			if(result[0].bock==1)
                    {
                         res.redirect("/login");
                    }	
     			else
                    {
                         if(result[0].Type==0)
                    {
                    
                    res.redirect("/news");   
                    }
                    else if(result[0].Type==2)
                    {
                    res.redirect("/reporter");
                         

                    }
                    else if(result[0].Type==1)
                    {
                         res.redirect("/admin");

                    }
                    }
     			});

     			
     				
     		}
     		else
     			res.send("Invalid Username or password");
     			
     });



});




module.exports=router;