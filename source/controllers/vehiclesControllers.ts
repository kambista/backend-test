import { Request, Response } from 'express';
import Vehicles, { Vehicle } from '../models/vehicles';

class VehicleControllers {
    constructor() {
    }

    // API
    public async get(request: Request, response: Response) : Promise<void> {
        const vehicles = await Vehicles.find();
        response.json(vehicles);
    }

    public async getBy(request: Request, response: Response) : Promise<void> {
        const vehicle = await Vehicles.findOne({ plate: request.params.plate }).populate('vehiclesStays');
        response.json(vehicle);
    }

    public async post(request: Request, response: Response) : Promise<void> {
        const newVehicle = new Vehicles({ plate: request.body.plate, type: request.body.type });
        await newVehicle.save();
        
        response.redirect('/Vehicles');
    }

    public async put(request: Request, response: Response) : Promise<void> {
        const vehicle = await Vehicles.findOneAndUpdate({ plate: request.params.plate }, request.body, { new: true });
        response.redirect('/Vehicles');
    }

    public async delete(request: Request, response: Response) : Promise<void> {
        const vehicle = await Vehicles.findOneAndDelete({ plate: request.params.plate });
        response.redirect('/Vehicles');
    }

    // Views
    public async index(request: Request, response: Response) : Promise<void> {
        const vehicles: Vehicle[] = await Vehicles.find().populate('vehiclesStays');
        response.render('vehicles/index', { title: 'Vehicles', vehicles });
    }

    public create(request: Request, response: Response) {
        response.render('vehicles/create', { title: 'Vehicles' });
    }
}

const vehicleControllers = new VehicleControllers();

export default vehicleControllers;