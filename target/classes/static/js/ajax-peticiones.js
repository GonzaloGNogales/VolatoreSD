$(document).ready(function() {
	// Tras esperar a que el documento esté iniciado se crean las variables que se necesitan
	var aeropuertos = [];
	var vuelosIda = [];
	var vuelosVuelta = [];

	// Petición ajax de tipo GET para obtener todos los nombres de aeropuertos del servidor y se establecen en el autocompletado
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
		var fechaIda = fechaIdaRaw.split("/").reverse().join("-"); // DD/MM/YYYY -> YYYY-MM-DD
		
		// Resetear la ventana emergente sea scrolleable
		$("#bodyModal").removeClass("bodyScroll");
		$("#contentModal").removeClass("contentDialogHeight");
		$("#dialogModal").removeClass("contentDialogHeight");
		$("#dialogModal").width(1000);
		
		if($('#botonI').is(':checked')) {
			// Se revisan los botones de solo ida o de ida y vuelta para realizar las peticiones al servidor
			if (origen.length != 0 && destino.length != 0 && fechaIda.length != 0) {
				$.ajax({
					url : "http://localhost:8080/vuelos/" + encodeURI(origen) + "/" + encodeURI(destino) + "/" + encodeURI(fechaIda)
				}).done(function(data) {
					// Hacer que la ventana emergente sea scrolleable
					$("#bodyModal").addClass("bodyScroll");
					$("#contentModal").addClass("contentDialogHeight");
					$("#dialogModal").addClass("contentDialogHeight");
					
					for (var i = 0; i < data.length; i++) {
						$("<div id=\"cont\" class=\"container-fluid rounded\">" +
							"<div class=\"row rounded paddedCustom\">" + 
							
								"<div class=\"col-md-4 text-left\">" +
								
									"<div class=\row\">" +
										"<div class=\"col-md-12\">" +
											"<span><strong>Código: </strong>" + data[i].codigoVuelo + "</span>" +
										"</div>" +
									"</div>" +
									
									"<div class=\row\">" +
										"<div class=\"col-md-12\">" +
											"<span><strong>Fecha del Vuelo: </strong>" + data[i].fechaVuelo.split("-").reverse().join("-") + "</span>" +
										"</div>" +
									"</div>" +
									
									"<div class=\row\">" +
										"<div class=\"col-md-12\">" +
											"<span><strong>Hora de salida: </strong>" + data[i].horaSalidaVuelo.substring(0, 5) + "</span>" +
										"</div>" +
									"</div>" +
									
									"<div class=\row\">" +
										"<div class=\"col-md-12\">" +
											"<span><strong>Empresa: </strong></span>" +
											"<span id=\"b\" class=\"hand empresa\" onclick=\"mostrarEmpresa(this);\">" + 
											data[i].empresa.nombreEmpresa + "</span>" +
										"</div>" +
									"</div>" +
		
								"</div>" +

								"<div class=\"col-md-5 text-center\">" +
								
									"<div class=\row\">" +
										"<div class=\"col-md-12 oriDestFont\">" +
											"<span>" + data[i].aeropuertoOrigen.nombreAeropuerto + "</span>" +
										"</div>" +
									"</div>" +
							
									"<div class=\row\">" +
										"<div class=\"col-md-12 oriDestFont\">" +
											"<i class=\"fa fa-long-arrow-right anchoFlecha\" aria-hidden=\"true\"></i>" +
										"</div>" +
									"</div>" +
							
									"<div class=\row\">" +
										"<div class=\"col-md-12 oriDestFont\">" +
											"<span>" + data[i].aeropuertoDestino.nombreAeropuerto + "</span>" +
										"</div>" +
									"</div>" +
							
									"<div class=\row\">" +
										"<div class=\"col-md-12\">" +
											"<span><strong>Duración: </strong></span><span>" + data[i].duracionVuelo + " mins</span>" +
										"</div>" +
									"</div>" +
							
								"</div>" +

								"<div class=\"col-md-3 text-center\">" +
								
									"<div class=\"row\">" +
										"<div class=\"col-md-12 text-center\">" +
											"<span><strong>Precio:</strong></span>" +
										"</div>" +
									"</div><br>" +
									
									"<div class=\"row\">" +
										"<div class=\"col-md-12 text-right\">" +
											"<span class=\"largeFont text-right colorPrecio\">" + data[i].precioVuelo + " €</span>" +
										"</div>" +
									"</div>" +	
									
								"</div>" +
								
							"</div>" +
						"</div>").appendTo('#bodyModal');
					}
				}).fail(function() {
					$("<h4>" + "No se han encontrado vuelos disponibles para los datos introducidos." + "</h4>").appendTo('#bodyModal');
				});
			} else {
				$("<h4>" + "No se ha realizado la búsqueda porque algún campo estaba vacío." + "</h4>").appendTo('#bodyModal');
			}
		} else {
			var fechaVueltaRaw = $("#datepickerVuelta").val();
			var fechaVuelta = fechaVueltaRaw.split("/").reverse().join("-");
			
			var fechaCompara1 = fechaIda.split("-").reverse();
			var fechaCompara2 = fechaVuelta.split("-").reverse();
			
			if (fechaCompara2[1] < fechaCompara1[1]) { // Condiciones para impedir que se busquen vuelos incoherentes
				$("<h4>" + "No se ha podido encontrar ningun vuelo porque la fecha de vuelta es anterior a la de ida." + "</h4>").appendTo('#bodyModal');
			}
			else if ((fechaCompara2[1] == fechaCompara1[1]) && (fechaCompara2[0] < fechaCompara1[0])) {
				$("<h4>" + "No se ha podido encontrar ningun vuelo porque la fecha de vuelta es anterior a la de ida." + "</h4>").appendTo('#bodyModal');
			}
			else if (origen.length != 0 && destino.length != 0 && fechaIda.length != 0 && fechaVuelta.length != 0) {
				// Se realizan 2 peticiones asíncronas al servidor para recoger todos los vuelos de ida y vuelta
				$.ajax({
					url : "http://localhost:8080/vuelos/" + encodeURI(origen) + "/" + encodeURI(destino) + "/" + encodeURI(fechaIda)
				}).done(function(dataI) {
					for (var i = 0; i < dataI.length; i++) {
						vuelosIda[i] = dataI[i];
					}
					
					// Segunda petición ajax anidada dentro de la primera al obtener los datos correctamente
					$.ajax({
						url : "http://localhost:8080/vuelos/" + encodeURI(destino) + "/" + encodeURI(origen) + "/" + encodeURI(fechaVuelta)
					}).done(function(dataV) {
						// Hacer que la ventana emergente sea scrolleable
						$("#bodyModal").addClass("bodyScroll");
						$("#contentModal").addClass("contentDialogHeight");
						$("#dialogModal").addClass("contentDialogHeight");
						$("#dialogModal").width(1300);

						for (var i = 0; i < vuelosIda.length; i++) {
							for (var j = 0; j < dataV.length; j++) {
								var horaIda = vuelosIda[i].horaSalidaVuelo;
								var horaVuelta = dataV[j].horaSalidaVuelo;

								// Se comprueba que las horas no sean incoherentes y que de tiempo a coger el vuelo de vuelta
								if (horaIda < horaVuelta) {
									if (vuelosIda[i].empresa.nombreEmpresa.localeCompare(dataV[j].empresa.nombreEmpresa) == 0) {
										var labelTotal = "<span class=\"largeFont3\"><strong>Total(" + 
										"<span class=\"text-danger\">" + "-20%" + "</span>" + "):</strong></span>";
										var precioTotal = "<span class=\"largeFont2 text-right colorPrecio\">" + 
										((vuelosIda[i].precioVuelo + dataV[j].precioVuelo) - ((vuelosIda[i].precioVuelo + dataV[j].precioVuelo) * 0.20)) + 
										" €</span>";									
									}
									else {
										var labelTotal = "<span class=\"largeFont3\"><strong>Total:</strong></span>";
										var precioTotal = "<span class=\"largeFont2 text-right colorPrecio\">" + 
										(vuelosIda[i].precioVuelo + dataV[j].precioVuelo) + " €</span>";
									}
									
									$("<div id=\"cont\" class=\"container-fluid rounded\">" +
											"<div class=\"row rounded paddedCustom\">" + 
											
												"<div class=\"col-md-3 text-left\">" +
											
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Código: </strong>" + vuelosIda[i].codigoVuelo + "</span>" +
														"</div>" +
													"</div>" +
													
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Fecha de Ida: </strong>" + vuelosIda[i].fechaVuelo.split("-").reverse().join("-") + "</span>" +
														"</div>" +
													"</div>" +
													
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Hora de Salida: </strong>" + vuelosIda[i].horaSalidaVuelo.substring(0, 5) + "</span>" +
														"</div>" +
													"</div>" +
													
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Empresa: </strong></span>" +
															"<span id=\"b\" class=\"hand empresa\" onclick=\"mostrarEmpresa(this);\">" + 
															vuelosIda[i].empresa.nombreEmpresa + "</span>" +
														"</div>" +
													"</div>" +
													
													"<hr/>" +
		
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Código: </strong>" + dataV[j].codigoVuelo + "</span>" +
														"</div>" +
													"</div>" +
												
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Fecha de Vuelta: </strong>" + dataV[j].fechaVuelo.split("-").reverse().join("-") + "</span>" +
														"</div>" +
													"</div>" +
													
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Hora de salida: </strong>" + dataV[j].horaSalidaVuelo.substring(0, 5) + "</span>" +
														"</div>" +
													"</div>" +
												
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Empresa: </strong></span>" +
															"<span id=\"b\" class=\"hand empresa\" onclick=\"mostrarEmpresa(this);\">" + 
															dataV[j].empresa.nombreEmpresa + "</span>" +
														"</div>" +
													"</div>" +
					
												"</div>" +

												"<div class=\"col-md-4 text-center\">" +
											
													"<div class=\row\">" +
														"<div class=\"col-md-12 oriDestFont\">" +
															"<span>" + vuelosIda[i].aeropuertoOrigen.nombreAeropuerto + "</span>" +
														"</div>" +
													"</div>" +
											
													"<div class=\row\">" +
														"<div class=\"col-md-12 oriDestFont\">" +
															"<i class=\"fa fa-long-arrow-right anchoFlecha\" aria-hidden=\"true\"></i>" +
														"</div>" +
													"</div>" +
											
													"<div class=\row\">" +
														"<div class=\"col-md-12 oriDestFont\">" +
															"<span>" + vuelosIda[i].aeropuertoDestino.nombreAeropuerto + "</span>" +
														"</div>" +
													"</div>" +
											
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Duración: </strong></span><span>" + vuelosIda[i].duracionVuelo + " mins</span>" +
														"</div>" +
													"</div>" +
		
													"<hr/>" +
					
													"<div class=\row\">" +
														"<div class=\"col-md-12 oriDestFont\">" +
															"<span>" + dataV[j].aeropuertoDestino.nombreAeropuerto + "</span>" +
														"</div>" +
													"</div>" +
										
													"<div class=\row\">" +
														"<div class=\"col-md-12 oriDestFont\">" +
															"<i class=\"fa fa-long-arrow-left anchoFlecha\" aria-hidden=\"true\"></i>" +
														"</div>" +
													"</div>" +
										
													"<div class=\row\">" +
														"<div class=\"col-md-12 oriDestFont\">" +
															"<span>" + dataV[j].aeropuertoOrigen.nombreAeropuerto + "</span>" +
														"</div>" +
													"</div>" +
										
													"<div class=\row\">" +
														"<div class=\"col-md-12\">" +
															"<span><strong>Duración: </strong></span><span>" + dataV[j].duracionVuelo + " mins</span>" +
														"</div>" +
													"</div>" +
										
												"</div>" +

												"<div class=\"col-md-2 text-center\">" +
											
													"<div class=\"row\">" +
														"<div class=\"col-md-12 text-center\">" +
															"<span><strong>Precio Ida:</strong></span>" +
														"</div>" +
													"</div><br>" +
													
													"<div class=\"row\">" +
														"<div class=\"col-md-12 text-right\">" +
															"<span class=\"largeFont3 text-right\">" + vuelosIda[i].precioVuelo + " €</span>" +
														"</div>" +
													"</div>" +	
													
													"<hr class=\"hrMT\"/>" +
													
													"<div class=\"row\">" +
														"<div class=\"col-md-12 text-center\">" +
															"<span><strong>Precio Vuelta:</strong></span>" +
														"</div>" +
													"</div><br>" +
												
													"<div class=\"row\">" +
														"<div class=\"col-md-12 text-right\">" +
															"<span class=\"largeFont3 text-right\">" + dataV[j].precioVuelo + " €</span>" +
														"</div>" +
													"</div>" +	
													
												"</div>" +
												
												"<div class=\"col-md-3 text-center\">" +
													
													"<br><br>" +
													
													"<div class=\"row\">" +
														"<div class=\"col-md-12 text-center\">" +
															labelTotal +
														"</div>" +
													"</div><br>" +
													
													"<div class=\"row\">" +
														"<div class=\"col-md-12 text-right\">" +
															precioTotal +
														"</div>" +
													"</div>" +	
												
												"</div>" +
												
											"</div>" +
											
									"</div>").appendTo('#bodyModal');
								}
							}
						}
					}).fail(function() {
						$("<h4>" + "No se han encontrado vuelos de vuelta disponibles para los datos introducidos." + "</h4>").appendTo('#bodyModal');
					});
				}).fail(function() {
					$("<h4>" + "No se han encontrado vuelos de salida disponibles para los datos introducidos." + "</h4>").appendTo('#bodyModal');
				});
			} else {
				$("<h4>" + "No se ha podido encontrar ningun vuelo porque algun campo no estaba relleno." + "</h4>").appendTo('#bodyModal');
			}
		}
	});
});

function mostrarEmpresa(nombreEmpresa) {
	$("#bodyEmpresa").empty();
	var nombre = $(nombreEmpresa).text();
	
	// Petición ajax de tipo GET para obtener todos los datos de una empresa concreta del servidor
	$.ajax({
		url : "http://localhost:8080/empresas/" + encodeURI(nombre)
	}).done(function(empresa) {
		$("<h5>" + "<strong>Código: </strong>" + empresa.codigoEmpresa + "<br/>" + 
				"<strong>Nombre: </strong>" + empresa.nombreEmpresa + "<br/>" +
				"<strong>Web: </strong><a href=\"" + empresa.webEmpresa + "\">" + empresa.webEmpresa + "</a><br/>" +
				"<strong>Teléfono: </strong>" + empresa.telefonoEmpresa + "</h5>").appendTo('#bodyEmpresa');
		$("<div id=\"rateEmpresa\" class=\"mx-auto\"></div><div id=\"rate\" class=\"counter\">" + empresa.valoracionEmpresa + "</div>").appendTo('#bodyEmpresa');
				
		$("#rateEmpresa").rateYo({
			rating: empresa.valoracionEmpresa,
			precision: 1,
			multiColor: {
				"startColor": "#FF0000", // ROJO
			    "endColor"  : "#F39C12"  // AMARILLO
			},
			readOnly: true
		});
	}).fail(function() {
		$("<h4>" + "No se ha encontrado la empresa." + "</h4>").appendTo('#bodyEmpresa');
	});
	
	$("#modalEmpresa").modal("show");
}

