/**
 * Frank Car Garage Resell index.html page  
 * related scripts 
 * @Author : Adarsh Agarwal
 */
var car_garage_resell  = {

	shoppingCart : [],
	totalAmount : 0.00,
	api_url : "http://localhost:8080/warehouse",
		
	/* Vehicle Datatable configuration */
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
								+ '" onclick="car_garage_resell.addToCart(this);" license="'	+ row.licensed
								+ '" class="btn btn-primary btn-circle btn-lg"><i class="fa fa-lg fa-plus-circle"></i></button>'
					},
				}, 
				],
			order: [[2, 'asc']]
	},
	
    /* Initialize on page load */	
	init : function() {
		car_garage_resell.getAllWarehouse();		
	},

	 /* API call to get Car details  and populate UI dataTable */	
	getAllWarehouse : function() {
		$.ajax({
				url : car_garage_resell.api_url,
				beforeSend : function(xhr) {
					xhr.setRequestHeader("Authorization", "Basic "
								+ btoa("admin" + ":" + "password"));
				},
				success : function(result) {
					car_garage_resell.vehicle_tableconfiguration.aaData = result;
				    $('#vehicle_table').DataTable(car_garage_resell.vehicle_tableconfiguration);
				    // Event handler initialization 
				    car_garage_resell.initializeEventHandler();
				}
			});
	},
	
	/* Case 2 more details on click 
	 *  of table row event handler 
	 */
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
		            row.child(car_garage_resell.format(row.data())).show();
		            tr.addClass('shown');
		        }
			});
    },
    
    /* UI display format on click row trigger */
	format : function (d) {
	    return (
	        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
	    	'<tr><td>Location: longitude :  '+   d.location.lat + '&emsp;latitude'+ d.location.long + '</td><td>'+
	        '</td></tr><tr><td>Year Model:  ' + d.yearModel + '</td><td>' +
	        '</td></tr><tr><td>Date Manufacured:  ' + d.dateAdded+ '</td><td></td></tr></table>'
	    );
	},
	
	/* Add to Shopping cart function 
	 * and show alert in case vehicle is not licensed 
	 **/
	addToCart : function(btn) {
		if(!btn.getAttribute('license')){
			alert("Sorry the vehicle is not licensed can't add to cart");
			return;
		}
		let shoppingObject = new Object();
		shoppingObject.carPrice = btn.getAttribute('price');
		shoppingObject.carModel = btn.getAttribute('model');
		car_garage_resell.shoppingCart.push(shoppingObject);
		car_garage_resell.totalAmount = (parseFloat(car_garage_resell.totalAmount) + parseFloat(shoppingObject.carPrice)).toFixed(2);
		$('#total_items').text(car_garage_resell.shoppingCart.length);
		$('#total_amt').text('US $' + car_garage_resell.totalAmount);
	},

};