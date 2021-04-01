"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VehiclesStaysSchema = new mongoose_1.Schema({
    checkIn: { type: String },
    checkOut: { type: String },
    duration: { type: Number },
    pay: { type: Number }
});
exports.default = mongoose_1.model('VehiclesStays', VehiclesStaysSchema);
