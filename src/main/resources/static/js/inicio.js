$(document).ready(function() {
	var fecha1 = new Date();
	var fecha2 = new Date(Date.now() + 12096e5);
	var fechaIda = fecha1.toLocaleDateString();
	var fechaVuelta = fecha2.toLocaleDateString();
	
	$("#datepickerIda").width("75px");
	$("#datepickerVuelta").width("75px");
	$("#datepickerIda").val(fechaIda);
	$("#datepickerVuelta").val(fechaVuelta);
	
	// Al iniciar la SPA se revisa el botón marcado para preparar la visibilidad
	if ($("input[name=botonTipoVuelo]:checked").val() == "ida") {
		$("#datepickerVuelta").hide();
		$("#labelvuelta").hide();
	} else if ($("input[name=botonTipoVuelo]:checked").val() == "idayvuelta") {
		$("#datepickerVuelta").fadeIn(1500);
		$("#labelvuelta").fadeIn(1500);
	}
	
	// Configuración del datepicker de Material-Kit
	$("#datepickerIda").datetimepicker({
		format : 'DD/MM/YYYY',
		icons : {
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
		format : 'DD/MM/YYYY',
		icons : {
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
	
	// Cambio de visibilidad de elementos según el botón que se marque (ida o ida y vuelta)
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
