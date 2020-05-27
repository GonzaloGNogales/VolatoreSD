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

	@RequestMapping(value = "/", method = RequestMethod.GET) // Peticion HTTP GET para obtener todos los vuelos
	public Collection<Vuelo> getAeropuertos() {
		return repVuelos.findAll();
	}

	@RequestMapping(value = "/{origen}/{destino}/{fecha}", method = RequestMethod.GET) // Petición concreta
	public ResponseEntity<Collection<Vuelo>> getVuelosDeterminados(@PathVariable(value = "origen") String codigoOrigen,
			@PathVariable(value = "destino") String codigoDestino, @PathVariable(value = "fecha") String fechaVuelo) {

		Aeropuerto aOrigen = repAeropuertos.findByCodigoAeropuerto(codigoOrigen);
		Aeropuerto aDestino = repAeropuertos.findByCodigoAeropuerto(codigoDestino);
		java.sql.Date fecha = Date.valueOf(fechaVuelo);

		Collection<Vuelo> vuelosDisponibles = repVuelos.findByAeropuertoOrigenAndAeropuertoDestinoAndFechaVuelo(aOrigen,
				aDestino, fecha);

		if (!vuelosDisponibles.isEmpty())
			return new ResponseEntity<>(vuelosDisponibles, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
