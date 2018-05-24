var db = require('./db');
module.exports = {
	getAll: function(callbackFromController) {
		var sql = "SELECT * FROM categories";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	get: function(id, callbackFromController){
		var sql = "SELECT * FROM categories WHERE cat_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	insert: function(cat, callbackFromController){
		var sql = "INSERT INTO categories VALUES (null, ?)";
		db.execute(sql, [cat.cat_name], function(result){
			callbackFromController(result);
		});
	},
	update: function(cat, callbackFromController) {
		var sql = "UPDATE departments SET dept_name WHERE dept_id=?";
		db.execute(sql, [cat.cat_name, cat.cat_id], function(result){
			callbackFromController(result);
		});
	}
};