package com.william.test.service;

import com.william.test.bean.RequestVehicle;
import com.william.test.model.Control;

public interface IControlService {

	Control registrarEntry(RequestVehicle obj);
	
	Control registrarExit(RequestVehicle obj);
}
