var db = require('./db');
module.exports = {
	verifyUser: function(user, callbackFromController){
		var sql = "SELECT * FROM logins WHERE username=? AND password=?";
		console.log(sql);	 
		db.execute(sql, [user.username, user.password], function (result){
			
			if(result.length == 1)
			{
				callbackFromController(true);
			}
			else
			{
				callbackFromController(false);
			}
		});
		 
		//connection.end();
	}
};