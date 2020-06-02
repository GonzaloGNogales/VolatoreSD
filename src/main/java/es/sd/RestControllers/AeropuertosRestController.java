package es.sd.RestControllers;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
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

	@RequestMapping(value = "/", method = RequestMethod.GET) // Peticion HTTP GET para obtener todos los aeropuertos e inicializar los autocomplete
	public Collection<Aeropuerto> getAeropuertos() {
		return repAeropuertos.findAll();
	}

}
