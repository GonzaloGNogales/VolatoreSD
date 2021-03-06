package es.sd.Controllers;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import es.sd.Entities.Aeropuerto;
import es.sd.Entities.Empresa;
import es.sd.Entities.Vuelo;
import es.sd.Repositories.AeropuertoRepository;
import es.sd.Repositories.EmpresaRepository;
import es.sd.Repositories.VueloRepository;

@Controller
public class HomeController {

	@Autowired
	private VueloRepository repVuelos;

	@Autowired
	private AeropuertoRepository repAeropuertos;

	@Autowired
	private EmpresaRepository repEmpresas;

	// CONSTRUCCIÓN DE LA BASE DE DATOS CON OBJETOS DE ENTIDADES DE EJEMPLO

	@PostConstruct
	public void construirBD() {

		// AEROPUERTOS

		Aeropuerto aeropuerto1 = new Aeropuerto("LEMD", "Madrid (Barajas - Adolfo Suarez)");
		repAeropuertos.save(aeropuerto1);

		Aeropuerto aeropuerto2 = new Aeropuerto("LEZL", "Sevilla");
		repAeropuertos.save(aeropuerto2);

		Aeropuerto aeropuerto3 = new Aeropuerto("LHBP", "Budapest");
		repAeropuertos.save(aeropuerto3);

		Aeropuerto aeropuerto4 = new Aeropuerto("LFOB", "Paris (Beauvais)");
		repAeropuertos.save(aeropuerto4);

		Aeropuerto aeropuerto5 = new Aeropuerto("LFPO", "Paris (Orly)");
		repAeropuertos.save(aeropuerto5);

		Aeropuerto aeropuerto6 = new Aeropuerto("LECU", "Madrid (Cuatro Vientos)");
		repAeropuertos.save(aeropuerto6);

		Aeropuerto aeropuerto7 = new Aeropuerto("LEBL", "Barcelona (El Prat - Josep Tarradellas)");
		repAeropuertos.save(aeropuerto7);

		// EMPRESAS

		Empresa empresa1 = new Empresa("NZ", "Air New Zealand", "https://www.airnewzealand.com/", 900993241, 4.7);
		repEmpresas.save(empresa1);

		Empresa empresa2 = new Empresa("AS", "Alaska Airlines", "https://www.alaskaair.com/", 900954724, 5);
		repEmpresas.save(empresa2);

		Empresa empresa3 = new Empresa("NH", "All Nippon Airways", "https://www.ana.co.jp/en/eur/", 900653123, 2.3);
		repEmpresas.save(empresa3);

		Empresa empresa4 = new Empresa("AY", "Finnair", "https://www.finnair.com/", 900456789, 3.5);
		repEmpresas.save(empresa4);

		Empresa empresa5 = new Empresa("RJ", "Royal Jordanian Airlines", "https://rj.com/", 900121323, 4.2);
		repEmpresas.save(empresa5);

		// VUELOS

		java.sql.Date fecha1 = Date.valueOf(LocalDate.of(2020, 05, 31));
		java.sql.Time hora1 = Time.valueOf(LocalTime.of(6, 30));
		Vuelo vuelo1 = new Vuelo("NZ1234", fecha1, hora1, 30, 762); // Tiempo de duracion en minutos
		vuelo1.setEmpresa(empresa1);
		vuelo1.setAeropuertoOrigen(aeropuerto1); // Madrid Barajas
		vuelo1.setAeropuertoDestino(aeropuerto7); // Barcelona
		repVuelos.save(vuelo1);
		
		java.sql.Time hora111 = Time.valueOf(LocalTime.of(8, 30));
		Vuelo vuelo111 = new Vuelo("NH5466", fecha1, hora111, 37, 823);
		vuelo111.setEmpresa(empresa3);
		vuelo111.setAeropuertoOrigen(aeropuerto1); // Madrid Barajas
		vuelo111.setAeropuertoDestino(aeropuerto7); // Barcelona
		repVuelos.save(vuelo111);
		
		java.sql.Time hora112 = Time.valueOf(LocalTime.of(10, 30));
		Vuelo vuelo112 = new Vuelo("NZ9008", fecha1, hora112, 42, 677);
		vuelo112.setEmpresa(empresa1);
		vuelo112.setAeropuertoOrigen(aeropuerto1); // Madrid Barajas
		vuelo112.setAeropuertoDestino(aeropuerto7); // Barcelona
		repVuelos.save(vuelo112);

		java.sql.Time hora2 = Time.valueOf(LocalTime.of(10, 45));
		Vuelo vuelo2 = new Vuelo("AS2231", fecha1, hora2, 25, 1522);
		vuelo2.setEmpresa(empresa2);
		vuelo2.setAeropuertoOrigen(aeropuerto1); // Madrid Barajas
		vuelo2.setAeropuertoDestino(aeropuerto7); // Barcelona
		repVuelos.save(vuelo2);

		java.sql.Time hora3 = Time.valueOf(LocalTime.of(19, 22));
		Vuelo vuelo3 = new Vuelo("NH4776", fecha1, hora3, 32, 1155);
		vuelo3.setEmpresa(empresa3);
		vuelo3.setAeropuertoOrigen(aeropuerto1); // Madrid Barajas
		vuelo3.setAeropuertoDestino(aeropuerto7); // Barcelona
		repVuelos.save(vuelo3);

		java.sql.Date fecha2 = Date.valueOf(LocalDate.of(2020, 07, 12));
		java.sql.Time hora4 = Time.valueOf(LocalTime.of(6, 50));
		Vuelo vuelo4 = new Vuelo("NZ6652", fecha2, hora4, 190, 8000);
		vuelo4.setEmpresa(empresa1);
		vuelo4.setAeropuertoOrigen(aeropuerto3); // Budapest
		vuelo4.setAeropuertoDestino(aeropuerto2); // Sevilla
		repVuelos.save(vuelo4);

		java.sql.Date fecha3 = Date.valueOf(LocalDate.of(2021, 01, 15));
		java.sql.Time hora5 = Time.valueOf(LocalTime.of(8, 10));
		Vuelo vuelo5 = new Vuelo("RJ3228", fecha3, hora5, 52, 562);
		vuelo5.setEmpresa(empresa5);
		vuelo5.setAeropuertoOrigen(aeropuerto4); // Paris
		vuelo5.setAeropuertoDestino(aeropuerto6); // Madrid Cuatro Vientos
		repVuelos.save(vuelo5);

		java.sql.Time hora6 = Time.valueOf(LocalTime.of(17, 30));
		Vuelo vuelo6 = new Vuelo("AY6778", fecha3, hora6, 35, 1032);
		vuelo6.setEmpresa(empresa4);
		vuelo6.setAeropuertoOrigen(aeropuerto7); // Barcelona
		vuelo6.setAeropuertoDestino(aeropuerto2); // Sevilla
		repVuelos.save(vuelo6);

		java.sql.Date fecha4 = Date.valueOf(LocalDate.of(2020, 03, 13));
		java.sql.Time hora7 = Time.valueOf(LocalTime.of(16, 15));
		Vuelo vuelo7 = new Vuelo("AY8722", fecha4, hora7, 150, 1200);
		vuelo7.setEmpresa(empresa4);
		vuelo7.setAeropuertoOrigen(aeropuerto6); // Madrid Cuatro Vientos
		vuelo7.setAeropuertoDestino(aeropuerto7); // Barcelona
		repVuelos.save(vuelo7);

		java.sql.Date fecha5 = Date.valueOf(LocalDate.of(2020, 02, 24));
		java.sql.Time hora8 = Time.valueOf(LocalTime.of(8, 30));
		Vuelo vuelo8 = new Vuelo("NZ4466", fecha5, hora8, 220, 3400);
		vuelo8.setEmpresa(empresa1);
		vuelo8.setAeropuertoOrigen(aeropuerto2); // Sevilla
		vuelo8.setAeropuertoDestino(aeropuerto3); // Budapest
		repVuelos.save(vuelo8);

		java.sql.Date fecha6 = Date.valueOf(LocalDate.of(2020, 06, 14));
		Vuelo vuelo9 = new Vuelo("NZ3322", fecha6, hora8, 30, 532); 
		vuelo9.setEmpresa(empresa1);
		vuelo9.setAeropuertoOrigen(aeropuerto7); // Barcelona
		vuelo9.setAeropuertoDestino(aeropuerto1); // Madrid Barajas
		repVuelos.save(vuelo9);
		
		java.sql.Time hora10 = Time.valueOf(LocalTime.of(8, 45));
		Vuelo vuelo10 = new Vuelo("AY3765", fecha6, hora10, 32, 850); 
		vuelo10.setEmpresa(empresa4);
		vuelo10.setAeropuertoOrigen(aeropuerto7); // Barcelona
		vuelo10.setAeropuertoDestino(aeropuerto1); // Madrid Barajas
		repVuelos.save(vuelo10);
		
		java.sql.Time hora11 = Time.valueOf(LocalTime.of(17, 35));
		Vuelo vuelo11 = new Vuelo("AS3225", fecha6, hora11, 31, 850); 
		vuelo11.setEmpresa(empresa2);
		vuelo11.setAeropuertoOrigen(aeropuerto7); // Barcelona
		vuelo11.setAeropuertoDestino(aeropuerto1); // Madrid Barajas
		repVuelos.save(vuelo11);
		
		java.sql.Date fecha8 = Date.valueOf(LocalDate.of(2020, 05, 31));
		java.sql.Time hora12 = Time.valueOf(LocalTime.of(18, 45));
		Vuelo vuelo12 = new Vuelo("AS7550", fecha8, hora12, 31, 932);
		vuelo12.setEmpresa(empresa2);
		vuelo12.setAeropuertoOrigen(aeropuerto7); // Barcelona
		vuelo12.setAeropuertoDestino(aeropuerto1); // Madrid Barajas
		repVuelos.save(vuelo12);
		
		java.sql.Time hora13 = Time.valueOf(LocalTime.of(9, 45));
		Vuelo vuelo13 = new Vuelo("AY7845", fecha8, hora13, 27, 1521);
		vuelo13.setEmpresa(empresa4);
		vuelo13.setAeropuertoOrigen(aeropuerto7); // Barcelona
		vuelo13.setAeropuertoDestino(aeropuerto1); // Madrid Barajas
		repVuelos.save(vuelo13);
		
		java.sql.Time hora14 = Time.valueOf(LocalTime.of(11, 45));
		Vuelo vuelo14 = new Vuelo("NH6335", fecha8, hora14, 35, 788); 
		vuelo14.setEmpresa(empresa3);
		vuelo14.setAeropuertoOrigen(aeropuerto7); // Barcelona
		vuelo14.setAeropuertoDestino(aeropuerto1); // Madrid Barajas
		repVuelos.save(vuelo14);

	}

	// MAPEO DEL INICIO DE LA APLICACIÓN

	@RequestMapping(value = "/")
	public String home(Model model) {
		return "index";
	}

}
