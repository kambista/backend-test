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
const vehiclesStays_1 = __importDefault(require("../models/vehiclesStays"));
const xlsx_1 = __importDefault(require("xlsx"));
const path_1 = __importDefault(require("path"));
class VehicleStaysControllers {
    constructor() {
    }
    // API
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
            if (request.body.type == 1) {
                const newVehicleStays = new vehiclesStays_1.default({ checkIn: request.body.hour });
                const vehicleStay = yield newVehicleStays.save();
                yield vehicles_1.default.findOneAndUpdate({ plate: request.body.plate }, { vehiclesStays: [vehicleStay] }, { new: true });
            }
            if (request.body.type == 2) {
                const vehicle = yield vehicles_1.default.findOne({ plate: request.body.plate }).populate('vehiclesStays');
                yield vehiclesStays_1.default.findOneAndUpdate({ _id: vehicle === null || vehicle === void 0 ? void 0 : vehicle.vehiclesStays[0]._id }, { checkOut: request.body.hour }, { new: true });
            }
            response.redirect('/VehiclesStays');
        });
    }
    startMonth(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiclesStays = yield vehiclesStays_1.default.find();
            vehiclesStays.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                yield vehiclesStays_1.default.findOneAndDelete({ _id: element._id });
            }));
            response.redirect('/VehiclesStays');
        });
    }
    paymentsPending(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const workSheetColumnNames = [
                "Plate",
                "Type",
                "CheckIn",
                "CheckOut",
                "Duration",
                "Pay"
            ];
            const vehicles = yield vehicles_1.default.find().populate('vehiclesStays');
            const data = new Array();
            vehicles.forEach(element => {
                const vehiclesStays = element.vehiclesStays;
                const vehicle = {
                    plate: element.plate,
                    type: element.type,
                    checkIn: vehiclesStays.find(p => p.__v === 0).checkIn,
                    checkOut: vehiclesStays.find(p => p.__v === 0).checkOut,
                    duration: vehiclesStays.find(p => p.__v === 0).duration,
                    pay: vehiclesStays.find(p => p.__v === 0).pay
                };
                data.push([{ vehicle }]);
            });
            const workSheetName = 'Payments Pending';
            const filePath = './paymentsPending.xlsx';
            const workBook = xlsx_1.default.utils.book_new();
            const workSheetData = [
                workSheetColumnNames,
                ...data
            ];
            const workSheet = xlsx_1.default.utils.aoa_to_sheet(workSheetData);
            xlsx_1.default.utils.book_append_sheet(workBook, workSheet, workSheetName);
            xlsx_1.default.writeFile(workBook, path_1.default.resolve(filePath));
            response.redirect('/VehiclesStays');
        });
    }
    discharge(request, response) {
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
    // Views
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehicles = yield vehicles_1.default.find().populate('vehiclesStays');
            response.render('vehiclesStays/index', { title: 'Vehicles Stays', vehicles });
        });
    }
    create(request, response) {
        response.render('vehiclesStays/create', { title: 'Vehicles Stays' });
    }
}
const vehicleStaysControllers = new VehicleStaysControllers();
exports.default = vehicleStaysControllers;
