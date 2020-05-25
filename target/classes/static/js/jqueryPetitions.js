$(document).ready(function() {
	$("#datepickerIda").datetimepicker({
		format : 'DD/MM/YYYY HH:mm',
		icons : {
			time : "fa fa-clock-o",
			date : "fa fa-calendar",
			up : "fa fa-chevron-up",
			down : "fa fa-chevron-down",
			previous : 'fa fa-chevron-left',
			next : 'fa fa-chevron-right',
			today : 'fa fa-screenshot',
			clear : 'fa fa-trash',
			close : 'fa fa-remove'
		}
	}).datetimepicker();

	$("#datepickerVuelta").datetimepicker({
		format : 'DD/MM/YYYY HH:mm',
		icons : {
			time : "fa fa-clock-o",
			date : "fa fa-calendar",
			up : "fa fa-chevron-up",
			down : "fa fa-chevron-down",
			previous : 'fa fa-chevron-left',
			next : 'fa fa-chevron-right',
			today : 'fa fa-screenshot',
			clear : 'fa fa-trash',
			close : 'fa fa-remove'
		}
	}).datetimepicker();
});
