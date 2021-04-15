package com.william.test.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.william.test.model.TypeVehicule;
import com.william.test.repository.ITypeVehicleRepository;
import com.william.test.service.ITypeVehicleService;

@Service
public class TypeVehiculeServiceImpl implements ITypeVehicleService {

	@Autowired
	private ITypeVehicleRepository repo;

	@Override
	public boolean eliminar(Integer id) {
		repo.deleteById(id);
		return true;
	}

	@Override
	public TypeVehicule registrar(TypeVehicule obj) {
		return repo.save(obj);
	}

	@Override
	public TypeVehicule modificar(TypeVehicule obj) {
		return repo.save(obj);
	}

	@Override
	public TypeVehicule listarPorId(Integer id) {
		Optional<TypeVehicule> op = repo.findById(id);
		return op.isPresent() ? op.get() : new TypeVehicule();
	}

	@Override
	public List<TypeVehicule> listar() {
		return repo.findAll();
	}

	@Override
	public TypeVehicule listarporDescripcion(String descripcion) {
		Optional<TypeVehicule> op = repo.findByDescripcion(descripcion);
		return op.isPresent() ? op.get() : new TypeVehicule();
	}

}
