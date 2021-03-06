$(document).ready(function() {
	var fecha1 = new Date();
	var fecha2 = new Date(Date.now() + 12096e5);
	var fechaIda = fecha1.toLocaleDateString();
	var fechaVuelta = fecha2.toLocaleDateString();
	
	// Se inicializan los campos de fecha con el dia de hoy y 14 dias despues para la vuelta
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
	
	// Configuración del datepicker de Material-Kit utilizado
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
	
	// Función para limpiar los datos de la ventana modal de resultado de búsqueda de los vuelos
	$("#buscar").click(function() {
		$("#bodyModal").empty();
	});
});
