package es.sd.RestControllers;

import java.sql.Date;
import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import es.sd.Entities.Aeropuerto;
import es.sd.Entities.Vuelo;
import es.sd.Repositories.AeropuertoRepository;
import es.sd.Repositories.VueloRepository;

@RestController
@RequestMapping(value = "/vuelos")
public class VuelosRestController {

	@Autowired
	private VueloRepository repVuelos;

	@Autowired
	private AeropuertoRepository repAeropuertos;

	// Método GET para vuelos concretos dado origen y destino

	@RequestMapping(value = "/{origen}/{destino}/{fecha}", method = RequestMethod.GET)
	public ResponseEntity<Collection<Vuelo>> getVuelosDeterminados(@PathVariable(value = "origen") String nombreOrigen,
			@PathVariable(value = "destino") String nombreDestino, @PathVariable(value = "fecha") String fechaVuelo) {

		Aeropuerto aOrigen = repAeropuertos.findByNombreAeropuerto(nombreOrigen);
		Aeropuerto aDestino = repAeropuertos.findByNombreAeropuerto(nombreDestino);
		java.sql.Date fecha = Date.valueOf(fechaVuelo);

		Collection<Vuelo> vuelosDisponibles = repVuelos.findByAeropuertoOrigenAndAeropuertoDestinoAndFechaVuelo(aOrigen,
				aDestino, fecha);

		if (!vuelosDisponibles.isEmpty())
			return new ResponseEntity<>(vuelosDisponibles, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
