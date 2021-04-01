"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VehiclesSchema = new mongoose_1.Schema({
    plate: { type: String, required: true, unique: true, uppercase: true },
    type: { type: String, required: true, uppercase: true },
    vehiclesStays: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'VehiclesStays' }]
});
exports.default = mongoose_1.model('Vehicles', VehiclesSchema);
