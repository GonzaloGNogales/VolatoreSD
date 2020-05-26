$(document).ready(function() {
	$.ajax({
		url:"http://localhost:8080/aeropuertos/"
	}).done(function(data) {
		var aeropuertos = [];
		for (var i = 0; i < data.length; i++) {
			aeropuertos[i] = data[i].nombreAeropuerto;
		}
	});
	
	$( "#aeropuertoOrigen" ).autocomplete({
	  source: aeropuertos
	});
	
	$( "#aeropuertoDestino" ).autocomplete({
		  source: aeropuertos
	});
});