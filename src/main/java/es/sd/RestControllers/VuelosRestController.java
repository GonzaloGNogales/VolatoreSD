package es.sd.RestControllers;

import java.sql.Date;
import java.sql.Time;
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

	@RequestMapping(value = "/{origen}/{destino}/{fecha}", method = RequestMethod.GET) // Método GET para vuelos
																						// concretos
	public ResponseEntity<Collection<Vuelo>> getVuelosDeterminados(@PathVariable(value = "origen") String nombreOrigen,
			@PathVariable(value = "destino") String nombreDestino, @PathVariable(value = "fecha") String fechaVuelo) {

		Aeropuerto aOrigen = repAeropuertos.findByNombreAeropuerto(nombreOrigen);
		Aeropuerto aDestino = repAeropuertos.findByNombreAeropuerto(nombreDestino);

		String[] partesFecha = fechaVuelo.split("\\s+");
		String fecha = partesFecha[0];
		String hora = partesFecha[1];

		java.sql.Date fechaV = Date.valueOf(fecha);
		java.sql.Time horaV = Time.valueOf(hora + ":00");

		Collection<Vuelo> vuelosDisponibles = repVuelos
				.findByAeropuertoOrigenAndAeropuertoDestinoAndFechaVueloAndHoraSalidaVuelo(aOrigen, aDestino, fechaV,
						horaV);

		if (!vuelosDisponibles.isEmpty())
			return new ResponseEntity<>(vuelosDisponibles, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
