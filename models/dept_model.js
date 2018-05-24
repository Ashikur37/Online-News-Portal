var db = require('./db');
module.exports = {
	getAll: function(callbackFromController) {
		var sql = "SELECT * FROM departments";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	get: function(id, callbackFromController){
		var sql = "SELECT * FROM departments WHERE dept_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	insert: function(user, callbackFromController){
		var sql = "INSERT INTO departments VALUES (null, ?)";
		db.execute(sql, [dept.dept_name], function(result){
			callbackFromController(result);
		});
	},
	update: function(user, callbackFromController) {
		var sql = "UPDATE departments SET dept_name WHERE dept_id=?";
		db.execute(sql, [dept.dept_name, dept.dept_id], function(result){
			callbackFromController(result);
		});
	}
};