package es.sd.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import es.sd.Entities.Aeropuerto;
import es.sd.Entities.Empresa;
import es.sd.Entities.Vuelo;

public interface VueloRepository extends JpaRepository<Vuelo, Long> {

	// Métodos simples de consulta de la base de datos

	Vuelo findByIdVuelo(long idVuelo);

	List<Vuelo> findByFechaVuelo(java.sql.Date fechaVuelo);

	List<Vuelo> findByHoraSalidaVuelo(java.sql.Time horaSalidaVuelo);

	List<Vuelo> findByDuracionVuelo(int duracionVuelo);

	List<Vuelo> findByPrecioVuelo(int precioVuelo);

	List<Vuelo> findByEmpresa(Empresa empresa);

	// Método para obtener todos los vuelos desde un aeropuerto origen hasta un
	// determinado aeropuerto destino un dia concreto

	List<Vuelo> findByAeropuertoOrigenAndAeropuertoDestinoAndFechaVuelo(Aeropuerto aeropuertoOrigen,
			Aeropuerto aeropuertoDestino, java.sql.Date fechaVuelo);

}
