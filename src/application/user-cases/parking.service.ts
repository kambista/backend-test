import { Inject, Injectable, Logger } from '@nestjs/common';
import { ValidationException } from '../common/exceptions/validation.exception';
import { ParkingRepository } from '../../domain/repositories/parking.repository';
import { Parking } from '../..//domain/entities/parking';
import { VehicleService } from './vehicle.service';
import { Calendar } from '../../domain/shared/utils/calendar';
import { VehicleTypeService } from './vehicle-type.service';
import { VEHICLE_TYPE } from '../../domain/shared/consts';

@Injectable()
export class ParkingService {
	private readonly logger = new Logger('ParkingService');

	constructor(
		@Inject('PARKING_REPOSITORY') private readonly parkingRepository: ParkingRepository,
		private readonly vehicleService: VehicleService,
		private readonly vehicleTypeService: VehicleTypeService
	) {
		this.logger.log('Construido correctamente');
	}

	public getParkingWithDate(date: any): Promise<Array<Parking>> {
		return this.parkingRepository.getAll();
	}

	public async checkin(licensePlate: string): Promise<Parking | null> {
		// Validamos que no haya parqueo  activo para la placa
		const queryValidation: Partial<Parking> = {
			licensePlate,
			isDone: false
		};
		const isValidParking = !await this.parkingRepository.getByQuery(queryValidation);
		if (!isValidParking) throw new ValidationException('La placa tiene parqueo activo.');

		const initialDate = Calendar.getInstance();

		const newParking = new Parking(licensePlate, initialDate);
		return this.parkingRepository.create(newParking);
	}

	public async checkout(id: string): Promise<Parking> {
		const parking = await this.parkingRepository.get(id);

		if (!parking || parking.isDone) throw new ValidationException('El parqueo es inexistente o ha culminado.');

		const vehicle = await this.vehicleService.getVehicleWithLicensePlate(parking.licensePlate);

		// Si es un vehiculo registrado no se le cobrara al salir
		let parkingPrice: number = 0;

		// Si NO esta registrado por DEFAULT ES  "NO_RESIDENTE"
		if (!vehicle) {
			const defaultVehicleType = await this.vehicleTypeService.getVehicleTypeWithId(VEHICLE_TYPE.NO_RESIDENTE);
			parkingPrice = defaultVehicleType.parkingPrice;
		} else if (![ VEHICLE_TYPE.OFICIAL, VEHICLE_TYPE.RESIDENTE ].includes(vehicle.vehicleType._id)) {
			// SI ES OTRO TIPO NUEVO . TOMARA EL PRECIO ESTABLECIDO
			parkingPrice = vehicle.vehicleType.parkingPrice;
		}

		parking.checkoutTime = Calendar.getInstance();
		const minuteOfParking = Calendar.diffInMinutes(parking.checkinTime, parking.checkoutTime);
		parking.amount = minuteOfParking * parkingPrice;

		// Si es Vehiculo RESIDENTE . Se ACTUALIZARA los minutos
		if (vehicle && vehicle.vehicleType._id == VEHICLE_TYPE.RESIDENTE) {
			vehicle.totalMinutesParking += minuteOfParking;
			this.vehicleService.updateVehicle(vehicle);
		}

		// Si es OFICIAL, residente o no_residente , igual la ESTANCIA queda REGISTRADA.
		parking.isDone = true;

		await this.parkingRepository.save(parking);
		return parking;
	}

	public async startMonth(): Promise<void> {
		// BORRA TODOS LOS PARQUEOS ... Si no estan activos 
		this.parkingRepository.deleteByQuery({"isDone":true});
		this.vehicleService.resetMinuteCounters();
	}
}
