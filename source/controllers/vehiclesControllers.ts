import { Request, Response } from 'express';
import Vehicles, { Vehicle } from '../models/vehicles';
import VehiclesStays from '../models/vehiclesStays';

class VehicleControllers {
    constructor() {
    }

    public async index(request: Request, response: Response) : Promise<void> {
        const vehicles: Vehicle[] = await Vehicles.find().populate('vehiclesStays');
        console.log(vehicles);
        response.render('vehicles/index', { title: 'Vehicles', vehicles });
    }

    public create(request: Request, response: Response) {
        response.render('vehicles/create', { title: 'Vehicles' });
    }

    public async get(request: Request, response: Response) : Promise<void> {
        const vehicles = await Vehicles.find();
        response.json(vehicles);
    }

    public async getBy(request: Request, response: Response) : Promise<void> {
        const vehicle = await Vehicles.findOne({ plate: request.params.plate }).populate('vehiclesStays');
        response.json(vehicle);
    }

    public async post(request: Request, response: Response) : Promise<void> {
        const newVehicleStays = new VehiclesStays({ checkIn: request.body.checkIn, checkOut: request.body.checkOut });
        await newVehicleStays.save();
        const newVehicle = new Vehicles({ plate: request.body.plate, type: request.body.type, vehiclesStays: [ newVehicleStays ] });
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
}

const vehicleControllers = new VehicleControllers();

export default vehicleControllers;