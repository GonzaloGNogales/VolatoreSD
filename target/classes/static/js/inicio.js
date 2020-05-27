$(document).ready(function() {
	var fecha1 = new Date();
	var fecha2 = new Date(Date.now() + 12096e5);
	var fechaIda = fecha1.toLocaleDateString() + fecha1.getHours() + ":" + fecha1.getMinutes();
	var fechaVuelta = fecha2.toLocaleDateString() + fecha2.getHours() + ":" + fecha2.getMinutes();
	
	$("#datepickerIda").width("115px");
	$("#datepickerVuelta").width("115px");
	$("#datepickerIda").val(fechaIda);
	$("#datepickerVuelta").val(fechaVuelta);
	
	if ($("input[name=botonTipoVuelo]:checked").val() == "ida") {
		$("#datepickerVuelta").hide();
		$("#labelvuelta").hide();
	} else if ($("input[name=botonTipoVuelo]:checked").val() == "idayvuelta") {
		$("#datepickerVuelta").fadeIn(1500);
		$("#labelvuelta").fadeIn(1500);
	}
	
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
	
	$("input[name=botonTipoVuelo]:radio").click(function() {
		if ($("input[name=botonTipoVuelo]:checked").val() == "ida") {
			$("#datepickerVuelta").hide();
			$("#labelvuelta").hide();
		} else if ($("input[name=botonTipoVuelo]:checked").val() == "idayvuelta") {
			$("#datepickerVuelta").fadeIn(1500);
			$("#labelvuelta").fadeIn(1500);
		}
	});
});
