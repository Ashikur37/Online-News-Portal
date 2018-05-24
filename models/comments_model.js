var db = require('./db');
module.exports = {
	getAll: function(callbackFromController) {
		var sql = "SELECT * FROM employees e,departments d where e.emp_department=d.dept_id";
		db.execute(sql, null ,function(result){
			callbackFromController(result);
		});
	},
	get: function(id, callbackFromController){
		var sql = "SELECT * FROM employees WHERE emp_id=?";
		db.execute(sql, [id], function(result){
			callbackFromController(result[0]);
		});
	},
	insert: function(cmt, callbackFromController){
		var sql = "INSERT INTO  comment VALUES (null, ?, ?,CURRENT_TIMESTAMP,?)";
		db.execute(sql, [cmt.news,cmt.comment,cmt.cmntr ], function(result){
			callbackFromController(result);
		});
	},
	update: function(emp, callbackFromController) {
		var sql = "UPDATE employees SET emp_name=?, emp_department=?,salary=? WHERE emp_id=?";
		db.execute(sql, [emp.emp_name,emp.emp_department,emp.salary, emp.emp_id], function(result){
			callbackFromController(result);
		});
	}
};