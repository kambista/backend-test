"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VehiclesStaysSchema = new mongoose_1.Schema({
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    duration: { type: Number },
    pay: { type: Number }
});
exports.default = mongoose_1.model('VehiclesStays', VehiclesStaysSchema);
