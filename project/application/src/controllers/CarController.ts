import {Response, Request} from "express";
import {getManager} from "typeorm";
import {Car} from "../entities/Car";

export async function save(request: Request, response: Response) {
    const repository = getManager().getRepository(Car);
    const newCar = repository.create(request.body);
    await repository.save(newCar);
    response.status(201).send(newCar);
}

export async function all(request: Request, response: Response) {
    const repository = getManager().getRepository(Car);
    const cars = await repository.find();
    response.send(cars);
}

export async function get(request: Request, response: Response) {
    const repository = getManager().getRepository(Car);
    let licensePlate = request.params.licensePlate;
    const car = await repository.findOne({where: {"licensePlate": licensePlate}});
    response.send(car);
}

// Caso de uso subir a vehículo residente.
export async function upResident(request: Request, response: Response) {
    let licensePlate = request.params.licensePlate;
    const repository = getManager().getRepository(Car);
    const car = await repository.findOne({where: {"licensePlate": licensePlate}});
    try {
        await Car.upResident(car!);
        response.send(car);
    } catch (error) {
        response.status(404).send({"message": "El vehículo no ha sido registrado."});
    }
}

// Caso de uso subir a vehículo oficial.
export async function upOficial(request: Request, response: Response) {
    let licensePlate = request.params.licensePlate;
    const repository = getManager().getRepository(Car);
    const car = await repository.findOne({where: {"licensePlate": licensePlate}});
    try {
        await Car.upOficial(car!);
        response.send(car);
    } catch (error) {
        response.status(404).send({"message": "El vehículo no ha sido registrado."});
    }
}