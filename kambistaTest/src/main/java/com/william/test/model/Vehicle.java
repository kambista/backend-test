package com.william.test.model;

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
@Table(name = "vehiculo")
public class Vehicle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idVehiculo;

	@Column(name = "placa", nullable = false, length = 20)
	private String placa;
	
	@ManyToOne
	@JoinColumn(name = "idTipoVehiculo", foreignKey = @ForeignKey(name = "FK_tipo_vehiculo"))
	private TypeVehicule tipoVehiculo;


	public Integer getIdVehiculo() {
		return idVehiculo;
	}

	public void setIdVehiculo(Integer idVehiculo) {
		this.idVehiculo = idVehiculo;
	}

	public String getPlaca() {
		return placa;
	}

	public void setPlaca(String placa) {
		this.placa = placa;
	}		

	public TypeVehicule getTipoVehiculo() {
		return tipoVehiculo;
	}

	public void setTipoVehiculo(TypeVehicule tipoVehiculo) {
		this.tipoVehiculo = tipoVehiculo;
	}
	
	
	
}
