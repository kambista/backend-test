package com.william.test.service;

import com.william.test.bean.RequestVehicle;
import com.william.test.model.Vehicle;

public interface IVehicleService extends ICRUD<Vehicle, Integer>{

	Vehicle listarporPlaca(String placa);
	
	Vehicle altaOficial(RequestVehicle request);
	
	Vehicle altaResidente(RequestVehicle request);
}
