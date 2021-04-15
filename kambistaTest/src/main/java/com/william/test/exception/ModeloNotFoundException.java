package com.william.test.exception;

public class ModeloNotFoundException extends RuntimeException{

	public ModeloNotFoundException(String mensaje) {
		super(mensaje);
	}
}
