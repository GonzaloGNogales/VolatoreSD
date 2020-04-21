package es.sd.Entities;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Aeropuerto {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idAeropuerto;

	private String codigoAeropuerto;
	private String nombreAeropuerto;

	@OneToMany(mappedBy = "aeropuerto")
	private List<Vuelo> vuelosAeropuerto; // Vuelos asociados con el aeropuerto

	// Generator Constructors

	public Aeropuerto() {
	}

	public Aeropuerto(String codigo, String nombre) {
		this.codigoAeropuerto = codigo;
		this.nombreAeropuerto = nombre;
		this.vuelosAeropuerto = new ArrayList<>();
	}

	// Getters and Setters

	public long getIdAeropuerto() {
		return idAeropuerto;
	}

	public void setIdAeropuerto(long idAeropuerto) {
		this.idAeropuerto = idAeropuerto;
	}

	public String getCodigoAeropuerto() {
		return codigoAeropuerto;
	}

	public void setCodigoAeropuerto(String codigoAeropuerto) {
		this.codigoAeropuerto = codigoAeropuerto;
	}

	public String getNombreAeropuerto() {
		return nombreAeropuerto;
	}

	public void setNombreAeropuerto(String nombreAeropuerto) {
		this.nombreAeropuerto = nombreAeropuerto;
	}

	public List<Vuelo> getVuelos() {
		return vuelosAeropuerto;
	}

	public void setVuelos(List<Vuelo> vuelos) {
		this.vuelosAeropuerto = vuelos;
	}

}
