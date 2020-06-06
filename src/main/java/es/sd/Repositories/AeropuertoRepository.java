package es.sd.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import es.sd.Entities.Aeropuerto;

public interface AeropuertoRepository extends JpaRepository<Aeropuerto, Long> {
	
	// Método de consulta a la BBDD utilizado para obtener los aeropuertos de origen y destino para un vuelo.
	
	Aeropuerto findByNombreAeropuerto(String nombreAeropuerto);
	
}
