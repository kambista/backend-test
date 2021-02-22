import {Request, Response} from "express";
import {getManager, In} from "typeorm";
import {Car} from "../entities/Car";
import {Period} from "../entities/Period";
import {Stay} from "../entities/Stay";
import {Type} from "../entities/Type";

export async function save(request: Request, response: Response) {
    const repository = getManager().getRepository(Period);
    const newPeriod = repository.create(request.body);
    await repository.save(newPeriod);
    response.status(201).send(newPeriod);
}

export async function all(request: Request, response: Response) {
    const repository = getManager().getRepository(Period);
    const periods = await repository.find();
    response.send(periods);
}

export async function get(request: Request, response: Response) {
    let id = request.params.id;
    const repository = getManager().getRepository(Period);
    const period = await repository.findOne(id);
    await period?.staies;
    response.send(period);
}

export async function initPeriod(request: Request, response: Response) {
    const current = await Period.current();
    if (current != undefined) {
        response.status(409).send({message: "El periodo ya ha sido inicializado."});
    } else {
        const newPeriod = await Period.init();
        response.status(201).send(newPeriod);
    }
}

export async function residentsPay(request: Request, response: Response) {
    let id = request.params.id;
    const periodRepository = getManager().getRepository(Period);
    const stayRepository = getManager().getRepository(Stay);
    const carRepository = getManager().getRepository(Car);
    const type = await Type.resident();
    const cars = await carRepository.find({where: {"type": type}});
    const period = await periodRepository.findOne(id);
    const staies = await stayRepository.find({
        where: {
            "period": period,
            "car": In(cars.map((car) => {return car.licensePlate})),
            "finished": true
        }
    });
    
    let obj: any = {};
    for (let stay of staies) {
        if (obj.hasOwnProperty(stay.car.licensePlate)) {
            obj[stay.car.licensePlate]["time"] += stay.time;
            obj[stay.car.licensePlate]["amount"] += stay.amount;
        } else {
            obj[stay.car.licensePlate] = {
                time: stay.time,
                amount: stay.amount
            }
        }
    }
    response.send(obj);
}