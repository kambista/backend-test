"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehiclesControllers_1 = __importDefault(require("../controllers/vehiclesControllers"));
class VehiclesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        // API
        this.router.get('/api/vehicles', vehiclesControllers_1.default.get);
        this.router.get('/api/vehicles:plate', vehiclesControllers_1.default.getBy);
        this.router.post('/api/vehicles', vehiclesControllers_1.default.post);
        this.router.put('/api/vehicles:plate', vehiclesControllers_1.default.put);
        this.router.delete('/api/vehicles:plate', vehiclesControllers_1.default.delete);
        // Views
        this.router.get('/vehicles', vehiclesControllers_1.default.index);
        this.router.get('/vehicles/Create', vehiclesControllers_1.default.create);
    }
}
const vehiclesRoutes = new VehiclesRoutes();
vehiclesRoutes.routes();
exports.default = vehiclesRoutes.router;
