/**
 * 
 */
var myscript = {

	shoppingCart : [],
	totalAmount : 0.00,
	api_url : "http://localhost:8080/warehouse",
	format : function (d) {
	    return (
	        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;"><tr><td>Location:</td><td>' +   d.location +
	        '</td></tr><tr><td>Year Model:</td><td>' + d.yearModel +
	        '</td></tr><tr><td>Extra info:</td>' +
	        '<td>' + d.dateAdded+ '</td></tr></table>'
	    );
	},
	
    vehicle_tableconfiguration : {
		pagination : "bootstrap",
		filter : true,
		destroy : true,
		pageLength : 10,		
		"columns" : [
			    {
					"data" : "model",
					render : function(data,type) {
						return '<a href="#">'+ data	+ '</a>';}
				},
				{ "data" : "make"},
				{ "data" : "warehouseName"},
				{ "data" : "carLocation"},
				{ "data" : "price",
				   render : function(data,type) {
						return 'US $'+ data;
					},
				},
				{
					data : 'car_pic',
					render : function(data,type, row, meta) {
						let num = (meta.row % 9) == 0 ? 6 : (meta.row % 9);
						return '<img src="image/car'+ num + '.jpg"  width="150" height="120">'
					},
				},
				{
					data : 'btn_add',
					render : function(data,	type, row, meta) {
						return '<button type="button" price = "'+ row.price + '" model ="'+ row.model
								+ '" onclick="myscript.addToCart(this);" license="'	+ row.licensed
								+ '" class="btn btn-primary btn-circle btn-lg"><i class="fa fa-lg fa-plus-circle"></i></button>'
					},
				}, 
				],
			order: [[2, 'asc']]
	},
    	
	init : function() {
		this.getAllWarehouse();		
	},

	getAllWarehouse : function() {
		$.ajax({
					url : myscript.api_url,
					beforeSend : function(xhr) {
						xhr.setRequestHeader("Authorization", "Basic "
								+ btoa("admin" + ":" + "password"));
					},
					success : function(result) {
						myscript.vehicle_tableconfiguration.aaData = result;
				    	$('#vehicle_table').DataTable(myscript.vehicle_tableconfiguration);
				    	myscript.initializeEventHandler();
					}
				});
	},
    initializeEventHandler: function(){
		let table =$('#vehicle_table').DataTable();
		$('#vehicle_table').on('click', 'tr', function() {
			  var tr = $(this).closest('tr');
		        var row = table.row(tr);
		 
		        if (row.child.isShown()) {
		            // This row is already open - close it
		            row.child.hide();
		            tr.removeClass('shown');
		        } else {
		            // Open this row
		            row.child(myscript.format(row.data())).show();
		            tr.addClass('shown');
		        }
			});
    },
	addToCart : function(btn) {
		let shoppingObject = new Object();
		shoppingObject.carPrice = btn.getAttribute('price');
		shoppingObject.carModel = btn.getAttribute('model');
		myscript.shoppingCart.push(shoppingObject);
		myscript.totalAmount = (parseFloat(myscript.totalAmount) + parseFloat(shoppingObject.carPrice)).toFixed(2);
		$('#total_items').text(myscript.shoppingCart.length);
		$('#total_amt').text('US $' + myscript.totalAmount);
	},

};