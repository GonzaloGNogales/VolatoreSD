package es.sd.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Empresa {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idEmpresa;

	private String codigoEmpresa;
	private String nombreEmpresa;
	private String webEmpresa;
	private int telefonoEmpresa;
	private int valoracionEmpresa;

	// Generator Constructors

	public Empresa() {
	}

	public Empresa(String codigo, String nombre, String web, int telefono) {
		this.codigoEmpresa = codigo;
		this.nombreEmpresa = nombre;
		this.webEmpresa = web;
		this.telefonoEmpresa = telefono;
		this.valoracionEmpresa = 0; // Valoración inicial de 0 porque nadie ha valorado
	}

	// Getters and Setters

	public long getIdEmpresa() {
		return idEmpresa;
	}

	public void setIdEmpresa(long idEmpresa) {
		this.idEmpresa = idEmpresa;
	}

	public String getCodigoEmpresa() {
		return codigoEmpresa;
	}

	public void setCodigoEmpresa(String codigoEmpresa) {
		this.codigoEmpresa = codigoEmpresa;
	}

	public String getNombreEmpresa() {
		return nombreEmpresa;
	}

	public void setNombreEmpresa(String nombreEmpresa) {
		this.nombreEmpresa = nombreEmpresa;
	}

	public String getWebEmpresa() {
		return webEmpresa;
	}

	public void setWebEmpresa(String webEmpresa) {
		this.webEmpresa = webEmpresa;
	}

	public int getTelefonoEmpresa() {
		return telefonoEmpresa;
	}

	public void setTelefonoEmpresa(int telefonoEmpresa) {
		this.telefonoEmpresa = telefonoEmpresa;
	}

	public int getValoracionEmpresa() {
		return valoracionEmpresa;
	}

	public void setValoracionEmpresa(int valoracionEmpresa) {
		this.valoracionEmpresa = valoracionEmpresa;
	}

}
