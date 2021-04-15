package com.william.test.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.william.test.model.TypeVehicule;

public interface ITypeVehicleRepository extends JpaRepository<TypeVehicule, Integer>{

	Optional<TypeVehicule> findByDescripcion(String descripcion);
}
