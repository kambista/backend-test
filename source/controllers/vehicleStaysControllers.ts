import { Request, Response } from 'express';
import VehiclesStays from '../models/vehiclesStays';

class VehicleStaysControllers {
    constructor() {
    }

    public async get(request: Request, response: Response) : Promise<void> {
        const vehiclesStays = await VehiclesStays.find();
        response.json(vehiclesStays);
    }

    public async getBy(request: Request, response: Response) : Promise<void> {
        const vehicle = await VehiclesStays.findOne({ _id: request.params.id });
        response.json(vehicle);
    }

    public async post(request: Request, response: Response) : Promise<void> {
        const newVehicleStay = new VehiclesStays(request.body);
        await newVehicleStay.save();
        response.json({ data: newVehicleStay });
    }

    public async put(request: Request, response: Response) : Promise<void> {
        const vehicleStay = await VehiclesStays.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true });
        response.json(vehicleStay);
    }

    public async delete(request: Request, response: Response) : Promise<void> {
        const vehicleStay = await VehiclesStays.findOneAndDelete({ _id: request.params.id });
        response.json(vehicleStay);
    }
}

const vehicleStaysControllers = new VehicleStaysControllers();

export default vehicleStaysControllers;