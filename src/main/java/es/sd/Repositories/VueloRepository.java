package es.sd.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import es.sd.Entities.Vuelo;

public interface VueloRepository extends JpaRepository<Vuelo, Long> {

	// Métodos simples de consulta de la base de datos

}
