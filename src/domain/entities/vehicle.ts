import { VehicleType } from './vehicle-type';

export class Vehicle {
	_id?: string;
	licensePlate: string;
	totalMinutesParking?: number;
	vehicleType: VehicleType;

	constructor(licensePlate: string, vehicleType: VehicleType) {
		this.licensePlate = licensePlate;
		this.vehicleType = vehicleType;
		this.totalMinutesParking = 0;
	}
}
