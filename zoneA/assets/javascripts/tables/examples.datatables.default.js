

(function( $ ) {

	'use strict';

	var datatableInit = function() {

		$('.tbl_data').dataTable({
			"order": [[0, "desc"]]
		});

		$('.tbl_data_2').DataTable({
			columnDefs: [{
				orderable: false,
				targets: 0
			}],
			"order": [
				[1, "desc"]
			]
		});
	};

	$(function() {
		datatableInit();
	});

}).apply( this, [ jQuery ]);