package com.william.test.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.william.test.bean.RequestVehicle;
import com.william.test.model.Control;
import com.william.test.service.IControlService;

@RestController
@RequestMapping("/control")
public class ControlController {
	
	@Autowired
	private IControlService service;
	
	@PostMapping("/entry")
    public ResponseEntity<Object> saveEntry(@RequestBody RequestVehicle objeto) {
		Control controlEntry = service.registrarEntry(objeto);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(controlEntry.getIdControl()).toUri();
		return ResponseEntity.created(location).build();
    }
	
	@PostMapping("/exit")
    public ResponseEntity<Object> saveExit(@RequestBody RequestVehicle objeto) {
		Control controlExit = service.registrarExit(objeto);
		return new ResponseEntity<>(controlExit, HttpStatus.OK);
    }

}
