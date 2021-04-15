package com.william.test.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.william.test.exception.ModeloNotFoundException;
import com.william.test.model.TypeVehicule;
import com.william.test.service.ITypeVehicleService;

@RestController
@RequestMapping("/typevehicule")
public class TypeVehicleController {
	
	@Autowired
	private ITypeVehicleService service;
	
	@GetMapping
	public ResponseEntity<List<TypeVehicule>> listar(){
		List<TypeVehicule> lista = service.listar();
		return new ResponseEntity<List<TypeVehicule>>(lista, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<TypeVehicule> listarPorId(@PathVariable("id") Integer id) {
		TypeVehicule obj = service.listarPorId(id);
		if(obj.getIdTipoVehiculo() == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO " + id);
		}
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}	
	
	@PostMapping
	public ResponseEntity<TypeVehicule> registrar(@Valid @RequestBody TypeVehicule objeto) {
		TypeVehicule typeVehicule = service.registrar(objeto);
		return new ResponseEntity<>(typeVehicule, HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<TypeVehicule> modificar(@Valid @RequestBody TypeVehicule objeto) {
		TypeVehicule obj = service.modificar(objeto);
		return new ResponseEntity<>(obj, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> eliminar(@PathVariable("id") Integer id) {
		service.eliminar(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
