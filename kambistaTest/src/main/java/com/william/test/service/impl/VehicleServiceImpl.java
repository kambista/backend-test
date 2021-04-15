package com.william.test.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.william.test.bean.RequestVehicle;
import com.william.test.model.TypeVehicule;
import com.william.test.model.Vehicle;
import com.william.test.repository.ITypeVehicleRepository;
import com.william.test.repository.IVehicleRepository;
import com.william.test.service.IVehicleService;
import com.william.test.util.Constante;

@Service
public class VehicleServiceImpl implements IVehicleService {
	
	@Autowired
	private IVehicleRepository repo;
	
	@Autowired
	private ITypeVehicleRepository repoType;


	@Override
	public Vehicle registrar(Vehicle obj) {
		Optional<TypeVehicule> op = repoType.findByDescripcion(Constante.NOT_RESIDENT);
		obj.setTipoVehiculo(op.isPresent() ? op.get() : new TypeVehicule());
		return repo.save(obj);
	}


	@Override
	public Vehicle modificar(Vehicle obj) {
		return repo.save(obj);
	}


	@Override
	public List<Vehicle> listar() {
		return repo.findAll();
	}


	@Override
	public Vehicle listarPorId(Integer id) {
		Optional<Vehicle> op = repo.findById(id);
		return op.isPresent() ? op.get() : new Vehicle();
	}


	@Override
	public boolean eliminar(Integer id) {
		repo.deleteById(id);
		return true;
	}


	@Override
	public Vehicle listarporPlaca(String placa) {
		Optional<Vehicle> op = repo.findByPlaca(placa);
		return op.isPresent() ? op.get() : new Vehicle();
	}


	@Override
	public Vehicle altaOficial(RequestVehicle request) {
		Optional<Vehicle> vehiOptional = repo.findByPlaca(request.getPlaca());
		if(vehiOptional.isPresent()) {
			Vehicle vehicle = vehiOptional.get();
			Optional<TypeVehicule> op = repoType.findByDescripcion(Constante.OFICIAL);
			vehicle.setTipoVehiculo(op.isPresent() ? op.get() : new TypeVehicule());
			return repo.save(vehicle);
		}else {
			return new Vehicle();
		}	
	}


	@Override
	public Vehicle altaResidente(RequestVehicle request) {
		Optional<Vehicle> vehiOptional = repo.findByPlaca(request.getPlaca());
		if(vehiOptional.isPresent()) {
			Vehicle vehicle = vehiOptional.get();
			Optional<TypeVehicule> op = repoType.findByDescripcion(Constante.RESIDENT);
			vehicle.setTipoVehiculo(op.isPresent() ? op.get() : new TypeVehicule());
			return repo.save(vehicle);
		}else {
			return new Vehicle();
		}	
	}

}
