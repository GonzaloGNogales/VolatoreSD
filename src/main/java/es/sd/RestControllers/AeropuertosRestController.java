package es.sd.RestControllers;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import es.sd.Entities.Aeropuerto;
import es.sd.Repositories.AeropuertoRepository;

@RestController
@RequestMapping(value = "/aeropuertos")
public class AeropuertosRestController {

	@Autowired
	private AeropuertoRepository repAeropuertos;

	@RequestMapping(value = "/", method = RequestMethod.GET) // Peticion HTTP GET para obtener todos los aeropuertos
	public Collection<Aeropuerto> getAeropuertos() {
		return repAeropuertos.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET) // Petición para obtener la información de uno concreto
	public ResponseEntity<Aeropuerto> getAeropuerto(@PathVariable(value = "id") long idAeropuerto) {

		Aeropuerto aeropuerto = repAeropuertos.findByIdAeropuerto(idAeropuerto);

		if (aeropuerto != null)
			return new ResponseEntity<>(aeropuerto, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
