package es.sd.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import es.sd.Entities.Aeropuerto;
import es.sd.Entities.Vuelo;

public interface VueloRepository extends JpaRepository<Vuelo, Long> {

	// Método para obtener todos los vuelos desde un aeropuerto origen hasta un
	// determinado aeropuerto destino un dia concreto

	List<Vuelo> findByAeropuertoOrigenAndAeropuertoDestinoAndFechaVueloAndHoraSalidaVuelo(Aeropuerto aeropuertoOrigen,
			Aeropuerto aeropuertoDestino, java.sql.Date fechaVuelo, java.sql.Time horaSalidaVuelo);

}
