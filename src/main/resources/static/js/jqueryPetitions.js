$(document).ready.(function() {
	
	$.ajax({
		url: "http://127.0.0.1:8080/aeropuertos/"
	}).done(function(data) {
		for (var i = 0; i < data.items.length; ++i) {
			$("#origen").append(data.items[i].nombreAeropuerto)
		}
	}).fail(function(data) {
		// cositas
	});
	
	$.ajax({
		url: "http://127.0.0.1:8080/aeropuertos/"
	}).done(function(data) {
		for (var i = 0; i < data.items.length; ++i) {
			$("#origen").append(data.items[i].nombreAeropuerto)
		}
	}).fail(function(data) {
		// cositas
	});
	
	$.ajax({
		url: "http://127.0.0.1:8080/aeropuertos/"
	}).done(function(data) {
		for (var i = 0; i < data.items.length; ++i) {
			$("#origen").append(data.items[i].nombreAeropuerto)
		}
	}).fail(function(data) {
		// cositas
	});
	
});


$(botonsito).onClick.function() {
	
}


