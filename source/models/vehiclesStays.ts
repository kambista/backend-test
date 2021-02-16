import mongoose, { Schema, model } from 'mongoose';

export interface VehicleStay extends mongoose.Document {
    checkIn: string,
    checkOut: string,
    duration: number,
    pay: number
}

const VehiclesStaysSchema = new Schema({
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    duration: { type: Number },
    pay: { type: Number }
});

export default model<VehicleStay>('VehiclesStays', VehiclesStaysSchema);