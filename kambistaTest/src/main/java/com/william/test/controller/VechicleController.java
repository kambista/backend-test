package com.william.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.william.test.bean.RequestVehicle;
import com.william.test.model.Vehicle;
import com.william.test.service.IVehicleService;

@RestController
@RequestMapping("/vehicle")
public class VechicleController {
	
	@Autowired
	private IVehicleService service;
	
	@GetMapping
	public ResponseEntity<List<Vehicle>> listar(){
		List<Vehicle> lista = service.listar();
		return new ResponseEntity<List<Vehicle>>(lista, HttpStatus.OK);
	}
	
	@PostMapping("/altaOficial")
    public ResponseEntity<Vehicle> altaOficial(@RequestBody RequestVehicle objeto) {
		Vehicle vehicle = service.altaOficial(objeto);
		return new ResponseEntity<>(vehicle, HttpStatus.OK);
    }
	
	@PostMapping("/altaResidente")
    public ResponseEntity<Vehicle> altaResidente(@RequestBody RequestVehicle objeto) {
		Vehicle vehicle = service.altaResidente(objeto);
		return new ResponseEntity<>(vehicle, HttpStatus.OK);
    }

}
