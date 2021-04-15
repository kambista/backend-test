package com.william.test.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.william.test.model.Vehicle;

public interface IVehicleRepository extends JpaRepository<Vehicle, Integer> {

	Optional<Vehicle> findByPlaca(String placa);
}
