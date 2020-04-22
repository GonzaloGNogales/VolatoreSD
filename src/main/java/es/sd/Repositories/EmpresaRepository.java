package es.sd.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import es.sd.Entities.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

	// Métodos simples de consulta de la base de datos
	
	Empresa findByIdEmpresa(long idEmpresa);
	
	Empresa findByCodigoEmpresa(String codigoEmpresa);
	
	Empresa findByWebEmpresa(String webEmpresa);
	
	Empresa findByTelefonoEmpresa(int telefonoEmpresa);
	
	List<Empresa> findByValoracionEmpresa(int valoracionEmpresa);

}
