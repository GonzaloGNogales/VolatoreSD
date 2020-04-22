package es.sd.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import es.sd.Entities.Aeropuerto;

public interface AeropuertoRepository extends JpaRepository<Aeropuerto, Long> {

	// Métodos simples de consulta de la base de datos

	Aeropuerto findByIdAeropuerto(long idAeropuerto);

	Aeropuerto findByCodigoAeropuerto(String codigoAeropuerto);

	Aeropuerto findByNombreAeropuerto(String nombreAeropuerto);

}
