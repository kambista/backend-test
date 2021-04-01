import { Request, Response } from 'express';
import Vehicles, { Vehicle } from '../models/vehicles';
import VehiclesStays from '../models/vehiclesStays';
import xlsx, { WorkSheet } from 'xlsx';
import path from 'path';
import moment from 'moment';

class VehicleStaysControllers {
    constructor() {
    }

    // API
    public async get(request: Request, response: Response) : Promise<void> {
        const vehiclesStays = await VehiclesStays.find();
        response.json(vehiclesStays);
    }

    public async getBy(request: Request, response: Response) : Promise<void> {
        const vehicle = await VehiclesStays.findOne({ _id: request.params.id });
        response.json(vehicle);
    }

    public async post(request: Request, response: Response) : Promise<void> {
        if (request.body.type == 1) {
            const newVehicleStays = new VehiclesStays({ checkIn: request.body.hour });
            const vehicleStay = await newVehicleStays.save();
            await Vehicles.findOneAndUpdate({ plate: request.body.plate }, { vehiclesStays: [ vehicleStay ] }, { new: true });
        }

        if (request.body.type == 2) {
            const vehicle = await Vehicles.findOne({ plate: request.body.plate }).populate('vehiclesStays');
            const startTime = moment(vehicle?.vehiclesStays[0].checkIn, "HH:mm");
            const endTime = moment(request.body.hour, "HH:mm");
            const duration = moment.duration(startTime.diff(endTime)).asMinutes();
            const pay = duration * 0.05;
            await VehiclesStays.findOneAndUpdate({ _id: vehicle?.vehiclesStays[0]._id }, { checkOut: request.body.hour, duration: Math.abs(duration), pay: Math.abs(pay) }, { new: true });
        }
        
        response.redirect('/VehiclesStays');
    }

    public async startMonth(request: Request, response: Response) : Promise<void> {
        const vehiclesStays = await VehiclesStays.find();
        vehiclesStays.forEach(async element => {
            await VehiclesStays.findOneAndDelete({ _id: element._id });
        });

        response.redirect('/VehiclesStays');
    }

    public async paymentsPending(request: Request, response: Response) : Promise<void> {
        const workSheetColumnNames: string[] = [
            "Plate",
            "Type",
            "CheckIn",
            "CheckOut",
            "Duration",
            "Pay"
        ];
        const vehicles: Vehicle[] = await Vehicles.find().populate('vehiclesStays');
        const data: any[][] = new Array();
        vehicles.forEach(element => {
            const vehiclesStays: any[] = element.vehiclesStays;

            const vehicle = {
                plate: element.plate,
                type: element.type,
                checkIn: vehiclesStays.find(p => p.__v === 0).checkIn,
                checkOut: vehiclesStays.find(p => p.__v === 0).checkOut,
                duration: vehiclesStays.find(p => p.__v === 0).duration,
                pay: vehiclesStays.find(p => p.__v === 0).pay
            }

            data.push([{vehicle}]);
        });
        
        const workSheetName = 'Payments Pending';
        const filePath = './paymentsPending.xlsx';

        const workBook = xlsx.utils.book_new();
        const workSheetData: any[][] = [
            workSheetColumnNames,
            ... data
        ];
        const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
        xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
        xlsx.writeFile(workBook, path.resolve(filePath));

        response.redirect('/VehiclesStays');
    }

    public async discharge(request: Request, response: Response) : Promise<void> {
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

    // Views
    public async index(request: Request, response: Response) : Promise<void> {
        const vehicles: Vehicle[] = await Vehicles.find().populate('vehiclesStays');
        response.render('vehiclesStays/index', { title: 'Vehicles Stays', vehicles });
    }

    public create(request: Request, response: Response) {
        response.render('vehiclesStays/create', { title: 'Vehicles Stays' });
    }
}

const vehicleStaysControllers = new VehicleStaysControllers();

export default vehicleStaysControllers;