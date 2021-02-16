"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicles_1 = __importDefault(require("../models/vehicles"));
class VehicleControllers {
    constructor() {
    }
    // API
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicles = yield vehicles_1.default.find();
            response.json(vehicles);
        });
    }
    getBy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicle = yield vehicles_1.default.findOne({ plate: request.params.plate }).populate('vehiclesStays');
            response.json(vehicle);
        });
    }
    post(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const newVehicle = new vehicles_1.default({ plate: request.body.plate, type: request.body.type });
            yield newVehicle.save();
            response.redirect('/Vehicles');
        });
    }
    put(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicle = yield vehicles_1.default.findOneAndUpdate({ plate: request.params.plate }, request.body, { new: true });
            response.redirect('/Vehicles');
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicle = yield vehicles_1.default.findOneAndDelete({ plate: request.params.plate });
            response.redirect('/Vehicles');
        });
    }
    // Views
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicles = yield vehicles_1.default.find().populate('vehiclesStays');
            response.render('vehicles/index', { title: 'Vehicles', vehicles });
        });
    }
    create(request, response) {
        response.render('vehicles/create', { title: 'Vehicles' });
    }
}
const vehicleControllers = new VehicleControllers();
exports.default = vehicleControllers;
