package com.william.test.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "control")
public class Control {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idControl;
	
	@Column(name = "fechaIngreso")
	private LocalDateTime fechaIngreso;
	
	@Column(name = "fechaSalida")
	private LocalDateTime fechaSalida;
	
	private Double importe;
	
	private Integer instancia;
	
	private Integer tiempo;
	
	private boolean state;
	
	@ManyToOne
	@JoinColumn(name = "idVehiculo", nullable = false, foreignKey = @ForeignKey(name = "FK_vehiculo"))
	private Vehicle vehiculo;

	public Integer getIdControl() {
		return idControl;
	}

	public void setIdControl(Integer idControl) {
		this.idControl = idControl;
	}

	public Vehicle getVehiculo() {
		return vehiculo;
	}

	public void setVehiculo(Vehicle vehiculo) {
		this.vehiculo = vehiculo;
	}

	public LocalDateTime getFechaIngreso() {
		return fechaIngreso;
	}

	public void setFechaIngreso(LocalDateTime fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}

	public LocalDateTime getFechaSalida() {
		return fechaSalida;
	}

	public void setFechaSalida(LocalDateTime fechaSalida) {
		this.fechaSalida = fechaSalida;
	}

	public Double getImporte() {
		return importe;
	}

	public void setImporte(Double importe) {
		this.importe = importe;
	}

	public Integer getInstancia() {
		return instancia;
	}

	public void setInstancia(Integer instancia) {
		this.instancia = instancia;
	}

	public Integer getTiempo() {
		return tiempo;
	}

	public void setTiempo(Integer tiempo) {
		this.tiempo = tiempo;
	}

	public boolean isState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}
	
	
	
}
