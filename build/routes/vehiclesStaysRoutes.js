"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicleStaysControllers_1 = __importDefault(require("../controllers/vehicleStaysControllers"));
class VehiclesStaysRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        // API
        this.router.get('/api/vehiclesStays', vehicleStaysControllers_1.default.get);
        this.router.get('/api/vehiclesStays:id', vehicleStaysControllers_1.default.getBy);
        this.router.post('/api/vehiclesStays', vehicleStaysControllers_1.default.post);
        this.router.post('/api/vehiclesStays/startMonth', vehicleStaysControllers_1.default.startMonth);
        this.router.post('/api/vehiclesStays/paymentsPending', vehicleStaysControllers_1.default.paymentsPending);
        this.router.post('/api/vehiclesStays/discharge', vehicleStaysControllers_1.default.discharge);
        this.router.put('/api/vehiclesStays:id', vehicleStaysControllers_1.default.put);
        this.router.delete('/api/vehiclesStays:id', vehicleStaysControllers_1.default.delete);
        // Views
        this.router.get('/vehiclesStays', vehicleStaysControllers_1.default.index);
        this.router.get('/vehiclesStays/Create', vehicleStaysControllers_1.default.create);
    }
}
const vehiclesStaysRoutes = new VehiclesStaysRoutes();
vehiclesStaysRoutes.routes();
exports.default = vehiclesStaysRoutes.router;
