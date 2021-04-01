import { VEHICLE_TYPE } from '../shared/consts';

export class VehicleType {
	_id?: VEHICLE_TYPE | number;
	name: string;
	parkingPrice: number;

	constructor(name: string, parkingPrice: number) {
		this.name = name;
		this.parkingPrice = parkingPrice;
	}
}
