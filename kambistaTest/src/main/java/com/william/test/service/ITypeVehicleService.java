package com.william.test.service;

import com.william.test.model.TypeVehicule;

public interface ITypeVehicleService extends ICRUD<TypeVehicule, Integer>{
	
	TypeVehicule listarporDescripcion(String descripcion);
}
