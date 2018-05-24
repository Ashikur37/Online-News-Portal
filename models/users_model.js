var db = require('./db');
module.exports = {
	getAll: function(callbackFromController) {
		var sql = "SELECT * FROM users,district,logins where users.district=district.district_id and users.User_ID=logins.User_ID";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	get: function(id, callbackFromController){
		var sql = "SELECT * FROM users WHERE user_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result);
		});
	},
	insert: function(user, callbackFromController){
		var sql = "INSERT INTO users VALUES (null, ?, ?,?,?)";
		db.execute(sql, [user.username,user.email,user.mobile,user.district ],function(result){
			callbackFromController(result);
		});
		
	},
	update: function(user, callbackFromController) {
		var sql = "UPDATE users SET  mobile=?,email=?,  WHERE user_id=?";
		db.execute(sql, [user.mobile,user.email , user.user_id], function(result){
			callbackFromController(result);
		});
	}
};