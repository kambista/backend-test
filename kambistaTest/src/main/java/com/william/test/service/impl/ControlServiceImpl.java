package com.william.test.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.william.test.bean.RequestVehicle;
import com.william.test.model.Control;
import com.william.test.model.TypeVehicule;
import com.william.test.model.Vehicle;
import com.william.test.repository.IControlRepository;
import com.william.test.repository.ITypeVehicleRepository;
import com.william.test.repository.IVehicleRepository;
import com.william.test.service.IControlService;
import com.william.test.util.Constante;
import com.william.test.util.Util;

@Service
public class ControlServiceImpl implements IControlService {
	
	@Autowired
	private IVehicleRepository repoVehicle;
	
	@Autowired
	private ITypeVehicleRepository repoTypeVehicle;
	
	@Autowired
	private IControlRepository repoControl;

	@Override
	public Control registrarEntry(RequestVehicle obj) {
		Optional<Vehicle> opVehicule = repoVehicle.findByPlaca(obj.getPlaca());
		Control control = new Control();
		control.setFechaIngreso(LocalDateTime.now());
		control.setState(false);
		if(!opVehicule.isPresent()) {
			Vehicle vehiculo  = new Vehicle();
			vehiculo.setPlaca(obj.getPlaca());
			Optional<TypeVehicule> opTypeVehicule = repoTypeVehicle.findByDescripcion(Constante.NOT_RESIDENT);
			vehiculo.setTipoVehiculo(opTypeVehicule.isPresent() ? opTypeVehicule.get() : new TypeVehicule());
			Vehicle objCreate = repoVehicle.save(vehiculo);
			
			//Asignar Vehiculo
			control.setVehiculo(objCreate);
		}else {
			control.setVehiculo(opVehicule.get());
		}
		return repoControl.save(control);
	}


	@Override
	public Control registrarExit(RequestVehicle obj) {
		//Obtener datos del vehiculo
		Optional<Vehicle> opVehiculo = repoVehicle.findByPlaca(obj.getPlaca());
		Vehicle vehicle  = opVehiculo.orElse(new Vehicle());
		
		//Obtener datos del control
		Optional<Control> opControl = repoControl.findByVehiculoAndState(vehicle,false);
		Control control  = opControl.orElse(new Control());
		
		//Obtener fecha de salida
		LocalDateTime fechaSalida = LocalDateTime.now();
		
		//Calculaar minutes
		int minutes = Util.difInMinutes(control.getFechaIngreso(),fechaSalida);
		
		control.setFechaSalida(fechaSalida);
		control.setTiempo(minutes);
		control.setState(true);
		if(vehicle.getTipoVehiculo().getDescripcion().equalsIgnoreCase(Constante.NOT_RESIDENT)) {
			//Calcular importe
			double monto = minutes * Constante.AMOUNT_NOT_RESIDENT;
			control.setImporte(monto);
		}else if (vehicle.getTipoVehiculo().getDescripcion().equalsIgnoreCase(Constante.OFICIAL)) {
			//Calcular instancia en horas
			int hours = Util.difInHours(control.getFechaIngreso(),fechaSalida);
			control.setInstancia(hours);
		}
			
		return repoControl.save(control);
	}


}
