import mongoose, { Schema, model } from 'mongoose';

export interface VehicleStay extends mongoose.Document {
    checkIn: string,
    checkOut: string
}

const VehiclesStaysSchema = new Schema({
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true }
});

export default model('VehiclesStays', VehiclesStaysSchema);