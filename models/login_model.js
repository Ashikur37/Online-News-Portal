var db = require('./db');
module.exports = {
	
	insert: function(user, callbackFromController){
		var sql1 = "INSERT INTO logins VALUES (null, ?, ?,0)";
		db.execute(sql1, [user.password,user.type ], function(result){
			callbackFromController(result);
		});
	},
	check: function(user, callbackFromController){
		var sql= "select * from logins where user_id=(select user_id from users where user_name=?) and password=?";
		db.execute(sql, [user.username,user.password ], function(result){
			callbackFromController(result);
		});
	},
	updatepass: function(id,password, callbackFromController) {
		var sql = "UPDATE logins SET  password=?  WHERE User_ID=?";
		db.execute(sql, [password,id], function(result){
			callbackFromController(result);
		});
	},
	get_pass: function(user, callbackFromController){
		var sql= "select * from logins where user_id=?";
		db.execute(sql, [user ], function(result){
			callbackFromController(result);
		});
	}
};