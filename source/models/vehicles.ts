import mongoose, { Schema, model } from 'mongoose';
import { VehicleStay } from '../models/vehiclesStays';

export interface Vehicle extends mongoose.Document {
    plate: string,
    type: string,
    vehiclesStays: VehicleStay[]
}

const VehiclesSchema = new Schema({
    plate: { type: String, required: true, unique: true, uppercase: true },
    type: { type: String, required: true, uppercase: true },
    vehiclesStays: [{ type: Schema.Types.ObjectId, ref: 'VehiclesStays' }]
});

export default model<Vehicle>('Vehicles', VehiclesSchema);