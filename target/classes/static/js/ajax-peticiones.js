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
					$("<table id=\"myTableIda\" class=\"table table-striped\">" +
							"<thead class=\"thead-light\">" +
								"<tr>" +
							    	"<th scope=\"col\">Código</th>" +
							    	"<th scope=\"col\">Fecha</th>" +
							    	"<th scope=\"col\">Duración</th>" +
							    	"<th scope=\"col\">Empresa</th>" +
							    	"<th scope=\"col\">Precio</th>" +
							    "</tr>" +
							"</thead>" +
							"<tbody>").appendTo('#bodyModal');
					for (var i = 0; i < data.length; i++) {
						$("<tr>" +
						      "<th scope=\"row\">" + data[i].codigoVuelo + "</th>" +
							  "<td>" + data[i].fechaVuelo + " " + data[i].horaSalidaVuelo.substring(0, 5) + "</td>" +
							  "<td>" + data[i].duracionVuelo + " mins</td>" +
							  "<td id=\"b\" class=\"hand empresa\" onclick=\"mostrarEmpresa(this);\">" + 
							  data[i].empresa.nombreEmpresa + "</td>" +
							  "<td>" + data[i].precioVuelo + " €</td>" +
						"</tr>").appendTo('#myTableIda');
					}
					$("</tbody></table>").appendTo("#myTableIda");
				}).fail(function() {
					$("<h4>" + "No se han encontrado vuelos disponibles para los datos introducidos." + "</h4>").appendTo('#bodyModal');
				});
			} else {
				$("<h4>" + "No se ha realizado la búsqueda porque algún campo estaba vacío." + "</h4>").appendTo('#bodyModal');
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
						vuelosIda[i] = dataI[i];
					}
					
					// Segunda petición ajax anidada dentro de la primera al obtener los datos correctamente
					$.ajax({
						url : "http://localhost:8080/vuelos/" + destino + "/" + origen + "/" + fechaVuelta
					}).done(function(dataV) {
						$("<table id=\"myTableIyV\" class=\"table table-striped\">" +
								"<thead class=\"thead-light\">" +
									"<tr>" +
										"<th scope=\"col\">Tipo de Vuelo</th>" +
								    	"<th scope=\"col\">Código</th>" +
								    	"<th scope=\"col\">Fecha</th>" +
								    	"<th scope=\"col\">Duración</th>" +
								    	"<th scope=\"col\">Empresa</th>" +
								    	"<th scope=\"col\">Precio</th>" +
								    	"<th scope=\"col\">Precio Total</th>" +
								    "</tr>" +
								"</thead>" +
								"<tbody>").appendTo('#bodyModal');
						for (var i = 0; i < vuelosIda.length; i++) {
							for (var j = 0; j < dataV.length; j++) {
								if (vuelosIda[i].empresa.nombreEmpresa.localeCompare(dataV[j].empresa.nombreEmpresa) == 0) {
									var empresa = "<span class=\"hand empresa\" onclick=\"mostrarEmpresa(this);\">" + vuelosIda[i].empresa.nombreEmpresa + "</span>";
									var precio = "<span class=\"text-danger\">" + "¡-20%!" + "</span><br/>" + 
									((vuelosIda[i].precioVuelo + dataV[j].precioVuelo) - ((vuelosIda[i].precioVuelo + dataV[j].precioVuelo) * 0.20));
								}
								else {
									var empresa = "<span class=\"hand empresa\" onclick=\"mostrarEmpresa(this);\">" + vuelosIda[i].empresa.nombreEmpresa + "</span><br/>" + 
									"<span class=\"hand empresa\" onclick=\"mostrarEmpresa(this);\">" + dataV[j].empresa.nombreEmpresa + "</span>";
									var precio = vuelosIda[i].precioVuelo + dataV[j].precioVuelo;
								}
								$("<tr>" +
								      "<th scope=\"row\">Ida: <br/>Vuelta: " + "</th>" +
								      "<td>" + vuelosIda[i].codigoVuelo + "<br/>" + dataV[j].codigoVuelo + "</td>" +
									  "<td>" + vuelosIda[i].fechaVuelo + " " + vuelosIda[i].horaSalidaVuelo.substring(0, 5) + "<br/>" + 
									  dataV[j].fechaVuelo + " " + dataV[j].horaSalidaVuelo.substring(0, 5) + "</td>" +
									  "<td>" + vuelosIda[i].duracionVuelo + " mins<br/>" + dataV[j].duracionVuelo + " mins</td>" +
									  "<td>" + empresa + "</td>" +
									  "<td>" + vuelosIda[i].precioVuelo + " €<br/>" + dataV[j].precioVuelo + " €</td>" +
									  "<td>" + precio + " €</td>" +
								"</tr>").appendTo('#myTableIyV');
							}
						}
						$("</tbody></table>").appendTo("#myTableIyV");
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
	
	// Petición ajax de tipo get para obtener todos los datos de una empresa concreta del servidor
	$.ajax({
		url : "http://localhost:8080/empresas/" + nombre
	}).done(function(empresa) {
		$("<h5>" + "<strong>Código: </strong>" + empresa.codigoEmpresa + "<br/>" + 
				"<strong>Nombre: </strong>" + empresa.nombreEmpresa + "<br/>" +
				"<strong>Web: </strong><a href=\"" + empresa.webEmpresa + "\">" + empresa.webEmpresa + "</a><br/>" +
				"<strong>Teléfono: </strong>" + empresa.telefonoEmpresa + "</h5>").appendTo('#bodyEmpresa');
		$("<div id=\"rateEmpresa\" class=\"mx-auto\"></div><div id=\"rate\" class=\"counter\">" + empresa.valoracionEmpresa + "</div>").appendTo('#bodyEmpresa');
		
		console.log(empresa.valoracionEmpresa);
		
		$("#rateEmpresa").rateYo({
			rating: empresa.valoracionEmpresa,
			precision: 1,
			multiColor: {
				"startColor": "#FF0000", // ROJO
			    "endColor"  : "#F39C12"  // AMARILLO
			},
		    onChange: function (rating, rateYoInstance) {
		    	$(this).next().text(rating);
		    },
			onSet: function (rating, rateYoInstance) {
				// PETICION DE TIPO PUT PARA ACTUALIZAR EL CAMPO DE VALORACION DE LA EMPRESA
				// empresa.valoracionEmpresa = (((empresa.valoracionEmpresa * empresa.contadorValoraciones) + rating) / (empresa.contadorValoraciones + 1));
				// empresa.contadorValoraciones = empresa.contadorValoraciones + 1;
			}
		});
	}).fail(function() {
		$("<h4>" + "No se ha encontrado la empresa." + "</h4>").appendTo('#bodyEmpresa');
	});
	
	$("#modalEmpresa").modal("show");
}

