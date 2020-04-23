package es.sd.RestControllers;

import java.util.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import es.sd.Entities.Empresa;
import es.sd.Repositories.EmpresaRepository;

@RestController
@RequestMapping(value = "/empresas")
public class EmpresasRestController {

	@Autowired
	private EmpresaRepository repEmpresas;

	@RequestMapping(value = "/", method = RequestMethod.GET) // Peticion HTTP GET para obtener todas las empresas
	public Collection<Empresa> getEmpresas() {
		return repEmpresas.findAll();
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET) // Petición para obtener la información de uno concreto
	public ResponseEntity<Empresa> getEmpresa(@PathVariable(value = "id") long idEmpresa) {

		Empresa empresa = repEmpresas.findByIdEmpresa(idEmpresa);

		if (empresa != null)
			return new ResponseEntity<>(empresa, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
