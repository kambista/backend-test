import {Response, Request} from "express";
import {getManager} from "typeorm";
import {Type} from "../entities/Type";

export async function save(request: Request, response: Response) {
    const repository = getManager().getRepository(Type);
    const newType = repository.create(request.body);
    await repository.save(newType);
    response.status(201).send(newType);
}

export async function all(request: Request, response: Response) {
    const repository = getManager().getRepository(Type);
    const types = await repository.find();
    response.send(types);
}