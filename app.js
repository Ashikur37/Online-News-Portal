var express=require("express");
var app=express();
var user=require("./controllers/Users");
var news=require("./controllers/news");
var reporter=require("./controllers/Reporter");
var admin=require("./controllers/Admin");
var expressSession = require('express-session');
var expressValidator = require('express-validator');
var newsModel=require.main.require('./models/news_model');
var bodyParser=require("body-parser");
var port=process.env.PORT||8085;

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'secret', resave: false, saveUninitialized:true}));
app.get("/",function(req,res){
	var date=new Date();
		var mnth=date.getMonth()+1;
		if(mnth<10)
			mnth="0"+mnth;
		var dat=date.getDate();
		if(dat<10)
			dat="0"+dat;
	var dt=date.getFullYear()+"-"+mnth+"-"+dat+"%";
	newsModel.getAll(dt,function(result){
		res.render("news/home",{news: result});
	});
	
});
app.post("/date_search",function(req,res){

		var dt=req.body.ds;
		var date=dt.split("/");
		date=date[2]+"-"+date[0]+"-"+date[1]+"%";
		console.log(date);
		newsModel.getAll(date,function(result){
		res.render("news/home",{news: result});
	});
     
});
app.post("/searc",function(req,res){

          var key="%"+req.body.key+"%";
          console.log(key);
          newsModel.getAllSearch(key,key,key,function(result){
          	console.log(result);
          res.render("news/home",{news: result,
          user:req.session.loggedUser});
     });
     
});
app.use(expressValidator());
app.use(user);
app.use(reporter);
app.use(admin);
app.use(news);
app.use(express.static(__dirname + '/public'));


app.listen(port,function(){

	console.log("server has started at "+port+" port"); 
});


