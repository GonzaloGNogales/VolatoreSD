package es.sd.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Vuelo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long idVuelo;

	private String codigoVuelo; // Compuesto por el código de la Empresa y 4 dígitos aleatorios ej. IECA2334
	private java.sql.Date fechaVuelo;
	private java.sql.Time horaSalidaVuelo;
	private int duracionVuelo; // Duración del vuelo en horas
	private int precioVuelo; // Precio del vuelo en euros €

	@ManyToOne
	@JoinColumn(name = "idEmpresa")
	private Empresa empresa;

	@ManyToOne
	@JoinColumn(name = "idAeropuerto")
	private Aeropuerto aeropuerto;

	// Generator Constructors

	public Vuelo() {
	}

	public Vuelo(String codigo, java.sql.Date fecha, java.sql.Time hora, int duracion, int precio) {
		this.codigoVuelo = codigo;
		this.fechaVuelo = fecha;
		this.horaSalidaVuelo = hora;
		this.duracionVuelo = duracion;
		this.precioVuelo = precio;
	}

	// Getters and Setters

	public long getIdVuelo() {
		return idVuelo;
	}

	public void setIdVuelo(long idVuelo) {
		this.idVuelo = idVuelo;
	}

	public String getCodigoVuelo() {
		return codigoVuelo;
	}

	public void setCodigoVuelo(String codigoVuelo) {
		this.codigoVuelo = codigoVuelo;
	}

	public java.sql.Date getFechaVuelo() {
		return fechaVuelo;
	}

	public void setFechaVuelo(java.sql.Date fechaVuelo) {
		this.fechaVuelo = fechaVuelo;
	}

	public java.sql.Time getHoraSalidaVuelo() {
		return horaSalidaVuelo;
	}

	public void setHoraSalidaVuelo(java.sql.Time horaSalidaVuelo) {
		this.horaSalidaVuelo = horaSalidaVuelo;
	}

	public int getDuracionVuelo() {
		return duracionVuelo;
	}

	public void setDuracionVuelo(int duracionVuelo) {
		this.duracionVuelo = duracionVuelo;
	}

	public int getPrecioVuelo() {
		return precioVuelo;
	}

	public void setPrecioVuelo(int precioVuelo) {
		this.precioVuelo = precioVuelo;
	}

	public Empresa getEmpresa() {
		return empresa;
	}

	public void setEmpresa(Empresa empresa) {
		this.empresa = empresa;
	}

	public Aeropuerto getAeropuerto() {
		return aeropuerto;
	}

	public void setAeropuerto(Aeropuerto aeropuerto) {
		this.aeropuerto = aeropuerto;
	}
}
