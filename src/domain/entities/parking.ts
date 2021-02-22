import { Calendar } from "../shared/utils/calendar";

export class Parking {
	_id?: string;
	licensePlate: string;
	checkinTime: string;
	checkoutTime?: string;
	isDone: boolean;
	amount?: number;

	constructor(licensePlate: string, checkinTime: string) {
		this.licensePlate = licensePlate;
		this.checkinTime = checkinTime;
		this.isDone = false;
	}
}
