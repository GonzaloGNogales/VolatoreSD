package es.sd.RestControllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
	public List<Vuelo> getVuelos() {
		return repVuelos.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET) // Petición para obtener la información de uno concreto
	public ResponseEntity<Vuelo> getVuelo(@PathVariable(value = "id") long idVuelo) {

		Vuelo vuelo = repVuelos.findByIdVuelo(idVuelo);

		if (vuelo != null)
			return new ResponseEntity<>(vuelo, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/{origen}/{destino}/{fecha}", method = RequestMethod.GET) // Petición concreta
	public ResponseEntity<List<Vuelo>> getVuelosDeterminados(
			@PathVariable(value = "origen") String nombreAeropuertoOrigen,
			@PathVariable(value = "destino") String nombreAeropuertoDestino,
			@PathVariable(value = "fecha") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) java.sql.Date fechaVuelo) {

		Aeropuerto aOrigen = repAeropuertos.findByNombreAeropuerto(nombreAeropuertoOrigen);
		Aeropuerto aDestino = repAeropuertos.findByNombreAeropuerto(nombreAeropuertoDestino);

		List<Vuelo> vuelosDisponibles = repVuelos.findByAeropuertoOrigenAndAeropuertoDestinoAndFechaVuelo(aOrigen,
				aDestino, fechaVuelo);

		if (!vuelosDisponibles.isEmpty())
			return new ResponseEntity<>(vuelosDisponibles, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
