package es.sd.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import es.sd.Entities.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

	// Métodos simples de consulta de la base de datos

}
