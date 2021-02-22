import { VEHICLE_TYPE } from './../../domain/shared/consts';
import { VehicleRepository } from './../../domain/repositories/vehicle.repository';
import { Exception } from '../common/exceptions/exception';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Messages } from '../../domain/shared/messages';
import { ValidationException } from '../common/exceptions/validation.exception';
import { Vehicle } from '../../domain/entities/vehicle';

@Injectable()
export class VehicleService {
	private readonly logger = new Logger('VehicleService');

	constructor(@Inject('VEHICLE_REPOSITORY') private readonly vehicleRepository: VehicleRepository) {
		this.logger.log('Construido correctamente');
	}

	public getVehicles(): Promise<Array<Vehicle>> {
		return this.vehicleRepository.getAll();
	}

	public async getVehicleWithLicensePlate(licensePlate: string): Promise<Vehicle> {
		const response = await this.vehicleRepository.getVehicleWithLicensePlate(licensePlate);
		return response;
	}

	public async registerVehicle(vehicle: Vehicle): Promise<Vehicle> {
		const isUniqueVehicle = !await this.vehicleRepository.getVehicleWithLicensePlate(vehicle.licensePlate);
		if (!isUniqueVehicle) throw new ValidationException(Messages.NAME_MUST_BE_UNIQUE);

		if (!vehicle.vehicleType) throw new ValidationException('NO ES UN TIPO DE VEHICULO VALIDO');

		vehicle.totalMinutesParking = 0;

		return this.vehicleRepository.create(vehicle).catch((error) => {
			this.logger.error(error.message);
			throw new Exception(Messages.EXCEPTION_DATABASE);
		});
	}

	public async updateVehicle(vehicle: Vehicle): Promise<Vehicle> {
		return this.vehicleRepository.save(vehicle).catch((error) => {
			this.logger.error(error.message);
			throw new Exception(Messages.EXCEPTION_DATABASE);
		});
	}

	public async resetMinuteCounters(): Promise<Boolean> {
		const resetParameters: Partial<Vehicle> = {
			totalMinutesParking: 0
		};
		return this.vehicleRepository.updatePartial({}, resetParameters);
	}

	public async getCurrentResidentDebts(): Promise<Array<Vehicle>> {
		let vehicles = await this.vehicleRepository.getVehiclesWithVehicleType(VEHICLE_TYPE.RESIDENTE);

		return vehicles.map((vehicle) => {
			const debt = Math.round(vehicle.totalMinutesParking * vehicle.vehicleType.parkingPrice * 100) / 100;
			vehicle['debt'] = debt;
			return vehicle;
		});
	}
}
