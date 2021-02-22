import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Car} from "../entities/Car";
import {Stay} from "../entities/Stay";
import {Period} from "../entities/Period";

export async function all(request: Request, response: Response) {
    const stayRepository = getManager().getRepository(Stay);
    const period = await Period.current();
    const staies = await stayRepository.find({where: {"period": period}});
    response.send(staies);
}

// Caso de uso registra entrada.
export async function registerStay(request: Request, response: Response) {
    const licensePlate = request.body.licensePlate;
    const period = await Period.current();
    const car = await Car.findOrCreate(licensePlate);
    const isStay = await Stay.isStay(car);
    if (isStay != undefined) {
        response.status(409).send({message: "El vehículo permanece estacionado."});
    } else {
        const newStay = await Stay.create(period!, car);
        response.send(newStay);
    }
}

// Caso de uso registra salida.
export async function registerExit(request: Request, response: Response) {
    const repository = getManager().getRepository(Car);
    const licensePlate = request.body.licensePlate;
    const car = await repository.findOne({where: {"licensePlate": licensePlate}});
    const stay = await Stay.isStay(car!);
    if (car == undefined) {
        response.status(404).send({message: "El vehículo no ha sido registrado."});
    } else if (stay == undefined) {
        response.status(409).send({message: "El vehículo no está estacionado."});
    }  else {
        await Stay.registerExit(stay);
        response.send(stay);
    }
}