package com.william.test.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.william.test.model.Control;
import com.william.test.model.Vehicle;

public interface IControlRepository extends JpaRepository<Control, Integer> {
	
	Optional<Control> findByVehiculoAndState(Vehicle vehiculo, boolean valor);
	
}
