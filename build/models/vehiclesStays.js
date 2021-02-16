"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VehiclesStaysSchema = new mongoose_1.Schema({
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    duration: { type: Number, required: true },
    pay: { type: Number, required: true }
});
exports.default = mongoose_1.model('VehiclesStays', VehiclesStaysSchema);
