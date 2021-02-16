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
const vehiclesStays_1 = __importDefault(require("../models/vehiclesStays"));
class VehicleStaysControllers {
    constructor() {
    }
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiclesStays = yield vehiclesStays_1.default.find();
            response.json(vehiclesStays);
        });
    }
    getBy(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicle = yield vehiclesStays_1.default.findOne({ _id: request.params.id });
            response.json(vehicle);
        });
    }
    post(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const newVehicleStay = new vehiclesStays_1.default(request.body);
            yield newVehicleStay.save();
            response.json({ data: newVehicleStay });
        });
    }
    put(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicleStay = yield vehiclesStays_1.default.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true });
            response.json(vehicleStay);
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicleStay = yield vehiclesStays_1.default.findOneAndDelete({ _id: request.params.id });
            response.json(vehicleStay);
        });
    }
}
const vehicleStaysControllers = new VehicleStaysControllers();
exports.default = vehicleStaysControllers;
