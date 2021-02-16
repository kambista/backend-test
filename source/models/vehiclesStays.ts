import mongoose, { Schema, model } from 'mongoose';

export interface VehicleStay extends mongoose.Document {
    checkIn: Date,
    checkOut: Date,
    duration: number,
    pay: number
}

const VehiclesStaysSchema = new Schema({
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    duration: { type: Number, required: true },
    pay: { type: Number, required: true }
});

export default model('VehiclesStays', VehiclesStaysSchema);