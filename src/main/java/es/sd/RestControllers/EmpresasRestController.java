package es.sd.RestControllers;

import java.text.DecimalFormat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

	@RequestMapping(value = "/{nombre}", method = RequestMethod.GET) // Petición para obtener la información de una empresa en concreto dado su nombre
	public ResponseEntity<Empresa> getEmpresa(@PathVariable(value = "nombre") String nombreEmpresa) {

		Empresa empresa = repEmpresas.findByNombreEmpresa(nombreEmpresa);

		if (empresa != null)
			return new ResponseEntity<>(empresa, HttpStatus.OK);
		else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@RequestMapping(value = "/{nombre}/{valoracion}", method = RequestMethod.PUT) // Petición para actualizar la valoración de la empresa
	public ResponseEntity<Empresa> actulizaEmpresa(@PathVariable(value = "nombre") String nombreEmpresa,
			@PathVariable(value = "valoracion") double valEmpresa, @RequestBody Empresa empresaActualizada) {

		Empresa empresa = repEmpresas.findByNombreEmpresa(nombreEmpresa);

		if (empresa != null) {
			DecimalFormat formater = new DecimalFormat("##.0");
			double nuevoVal = (((empresa.getValoracionEmpresa() * empresa.getContadorValoraciones()) + valEmpresa)
					/ (empresa.getContadorValoraciones() + 1));
			
			empresaActualizada.setValoracionEmpresa(Double.parseDouble(formater.format(nuevoVal).replace(',', '.')));
			empresaActualizada.setContadorValoraciones(empresa.getContadorValoraciones() + 1); // Aumenta el contador de valoraciones totales
			repEmpresas.save(empresaActualizada); // Actualizar la valoración de la empresa en la base de datos

			return new ResponseEntity<>(empresa, HttpStatus.OK);
		} else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

}
