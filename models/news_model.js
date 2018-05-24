var db = require('./db');
module.exports = {
	getAll: function(dt,callbackFromController) {
		var sql = "SELECT * FROM news n left join comment c on n.News_ID=c.N_ID,district d,users u,categories ca where n.District_ID=d.district_ID and u.User_ID=n.Reporter_ID and ca.cat_id=n.Cat_ID and hide=0 and status=1 and Post_time like(?) order by News_ID";
		db.execute(sql, [dt] ,function(result){
			callbackFromController(result);
		});
	},
	getDN: function(callbackFromController) {
		var sql = "SELECT District_Name,sum(status) FROM district,news where district.District_ID=news.District_ID GROUP by news.District_ID";
		db.execute(sql, function(result){
			callbackFromController(result);
		});
	},
	getNewsReporter:function(id,callbackFromController) {
		var sql = "SELECT * FROM news n ,district d,users u,categories ca where n.District_ID=d.district_ID and u.User_ID=n.Reporter_ID and ca.cat_id=n.Cat_ID and Reporter_ID='?'   order by News_ID";
		db.execute(sql, [id] ,function(result){
			callbackFromController(result);
		});
	},
	getAllSearch: function(key1,key2,key3,callbackFromController) {
		var sql = "SELECT * FROM news n left join comment c on n.News_ID=c.N_ID,district d,users u,categories ca where n.District_ID=d.district_ID and u.User_ID=n.Reporter_ID and hide=0 and status=1 and ca.cat_id=n.Cat_ID and (Post_time like(?) or Heading like(?) or Details like(?))   order by News_ID";
		db.execute(sql, [key1,key2,key3] ,function(result){
			callbackFromController(result);
		});
	},
	getCatSearch: function(key,callbackFromController) {
		var sql = "SELECT * FROM news n left join comment c on n.News_ID=c.N_ID,district d,users u,categories ca where n.District_ID=d.district_ID and u.User_ID=n.Reporter_ID and hide=0 and status=1 and ca.cat_id=n.Cat_ID and Cat_Name=?   order by News_ID";
		db.execute(sql, [key] ,function(result){
			callbackFromController(result);
		});
	},
	getUnaproved: function(callbackFromController) {
		var sql = "SELECT * FROM news,categories,district,users where news.reporter_id=users.user_id and news.status=0 and  news.cat_id=categories.cat_id and news.district_id=district.district_id";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	getAproved: function(callbackFromController) {
		var sql = "SELECT * FROM news,categories,district,users where news.reporter_id=users.user_id and news.status=1 and  news.cat_id=categories.cat_id and news.district_id=district.district_id";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	aprove: function(id, callbackFromController){
		var sql = "update news set status='1' WHERE news_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	hide: function(id, callbackFromController){
		var sql = "update news set hide='1' WHERE news_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	makeReporter: function(id, callbackFromController){
		var sql = "update logins set type='2' WHERE user_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	makeAdmin: function(id, callbackFromController){
		var sql = "update logins set type='3' WHERE user_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	block: function(id, callbackFromController){
		var sql = "update logins set block='1' WHERE user_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	unblock: function(id, callbackFromController){
		var sql = "update logins set block='0' WHERE user_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	unhide: function(id, callbackFromController){
		var sql = "update news set hide='0' WHERE news_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	delete: function(id, callbackFromController){
		var sql = "delete from news WHERE news_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	insert: function(news, callbackFromController){
		var sql = "INSERT INTO news VALUES (null, ?, ?,'img', ?, ?,?, 0,  CURRENT_TIMESTAMP,0)";
		db.execute(sql, [news.heading,news.details,news.district,news.reporter,news.cat ], function(result){
			callbackFromController(result);
		});
	},
	update: function(news, callbackFromController) {
		var sql = "UPDATE news SET heading=?, details=?,image=?, status=?,hide=? WHERE news_id=?";
		db.execute(sql, [news.heading,news.details,news.image,news.status,news.hide , news.news_id], function(result){
			callbackFromController(result);
		});
	}
};