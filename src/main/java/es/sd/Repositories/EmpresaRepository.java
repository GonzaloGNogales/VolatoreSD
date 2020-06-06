package es.sd.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import es.sd.Entities.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

	// Método para encontrar una empresa en la BBDD dado su nombre para mostrar su información al usuario.

	Empresa findByNombreEmpresa(String nombreEmpresa);

}
