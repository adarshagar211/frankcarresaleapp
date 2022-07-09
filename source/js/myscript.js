/**
 * 
 */
var myscript = {
	init : function() {
		console.log("Hello Wrold");
		this.getAllWarehouse();
	},

	getAllWarehouse : function() {
		$.ajax({
			url : "http://localhost:8080/warehouse",
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Authorization", "Basic "
						+ btoa("admin" + ":" + "password"));
			},
			success : function(result) {
				$('#example').DataTable({
					data : result,
					pagination : "bootstrap",
					filter : true,
					destroy : true,
					pageLength : 10,
					"columns" : [ {"data" : "warehouseId"}, 
						          {"data" : "warehouseName"}, 
						          {"data" : "carLocation"} ]
				});
			}
		});
	}

};