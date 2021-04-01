import mongoose, { Schema, model } from 'mongoose';

export interface VehicleStay extends mongoose.Document {
    checkIn: string,
    checkOut: string,
    duration: number,
    pay: number
}

const VehiclesStaysSchema = new Schema({
    checkIn: { type: String },
    checkOut: { type: String },
    duration: { type: Number },
    pay: { type: Number }
});

export default model<VehicleStay>('VehiclesStays', VehiclesStaysSchema);