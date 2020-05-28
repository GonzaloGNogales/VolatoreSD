$(document).ready(function() {
	// Tras esperar a que el documento esté iniciado se crean las variables que se necesitan
	var aeropuertos = [];
	var vuelosIda = [];
	var vuelosVuelta = [];

	// Petición ajax de tipo get para obtener todos los nombres de aeropuertos del servidor y se establecen en el autocompletado
	$.ajax({
		url : "http://localhost:8080/aeropuertos/"
	}).done(function(data) {
		for (var i = 0; i < data.length; i++) {
			aeropuertos[i] = data[i].nombreAeropuerto;
		}
	});

	$("#aeropuertoOrigen").autocomplete({
		source : aeropuertos
	});

	$("#aeropuertoDestino").autocomplete({
		source : aeropuertos
	});
	
	// Manejador para el botón de búsqueda que muestra la ventana modal con los resultados
	$("#buscar").click(function(data) { 
		// Se recogen los valores de los campos del formulario
		var origen = $("#aeropuertoOrigen").val();
		var destino = $("#aeropuertoDestino").val();
		var fechaIdaRaw = $("#datepickerIda").val();
		var fechaIda = fechaIdaRaw.split("/").reverse().join("-");
		
		if($('#botonI').is(':checked')) {
			// Se revisan los botones de solo ida o de ida y vuelta para realizar las peticiones al servidor
			if (origen.length != 0 && destino.length != 0 && fechaIda.length != 0) {
				$.ajax({
					url : "http://localhost:8080/vuelos/" + origen + "/" + destino + "/" + fechaIda
				}).done(function(data) {
					for (var i = 0; i < data.length; i++) {
						vuelosIda[i] = data[i].codigoVuelo;
					}
					$("<p>" + "Se han encontrado los vuelos." + "</p>").appendTo('#bodyModal');
				}).fail(function() {
					$("<p>" + "No se han encontrado vuelos disponibles para los datos introducidos." + "</p>").appendTo('#bodyModal');
				});
			} else {
				$("<p>" + "No se ha realizado la búsqueda porque algún campo estaba vacío." + "</p>").appendTo('#bodyModal');
			}
		} else {
			var fechaVueltaRaw = $("#datepickerVuelta").val();
			var fechaVuelta = fechaVueltaRaw.split("/").reverse().join("-");
			
			if (origen.length != 0 && destino.length != 0 && fechaIda.length != 0 && fechaVuelta.length != 0) {
				// Se realizan 2 peticiones asíncronas al servidor para recoger todos los vuelos de ida y vuelta
				$.ajax({
					url : "http://localhost:8080/vuelos/" + origen + "/" + destino + "/" + fechaIda
				}).done(function(dataI) {
					for (var i = 0; i < dataI.length; i++) {
						vuelosIda[i] = dataI[i].codigoVuelo;
					}
					
					// Segunda petición ajax anidada dentro de la primera al obtener los datos correctamente
					$.ajax({
						url : "http://localhost:8080/vuelos/" + destino + "/" + origen + "/" + fechaVuelta
					}).done(function(dataV) {
						for (var i = 0; i < dataV.length; i++) {
							vuelosVuelta[i] = dataV[i].codigoVuelo;
						}
						$("<p>" + "Se han encontrado los vuelos." + "</p>").appendTo('#bodyModal');
					}).fail(function() {
						$("<p>" + "No se han encontrado vuelos de vuelta disponibles para los datos introducidos." + "</p>").appendTo('#bodyModal');
					});
					
				}).fail(function() {
					$("<p>" + "No se han encontrado vuelos de salida disponibles para los datos introducidos." + "</p>").appendTo('#bodyModal');
				});
			} else {
				$("<p>" + "No se ha podido encontrar ningun vuelo porque algun campo no estaba relleno." + "</p>").appendTo('#bodyModal');
			}
		}
	});
	
});