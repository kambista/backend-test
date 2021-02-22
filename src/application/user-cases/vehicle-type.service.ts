import { Exception } from './../common/exceptions/exception';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { VehicleType } from '../../domain/entities/vehicle-type';
import { Messages } from '../../domain/shared/messages';
import { ValidationException } from '../common/exceptions/validation.exception';
import { VehicleTypeRepository } from '../../domain/repositories/vehicle-type.repository';

@Injectable()
export class VehicleTypeService {
	private readonly logger = new Logger('VehicleTypesService');

	constructor(@Inject('TYPE_REPOSITORY') private readonly vehicleTypeRepository: VehicleTypeRepository) {
		this.logger.log('Construido correctamente');
	}

	public getVehicleTypes(): Promise<Array<VehicleType>> {
		return this.vehicleTypeRepository.getAll();
	}

	public getVehicleTypeWithId(id: number): Promise<VehicleType | null> {
		return this.vehicleTypeRepository.get(id);
	}

	public async registerVehicleType(vehicleType: VehicleType): Promise<VehicleType> {
		const isUniqueVehicleType = !await this.vehicleTypeRepository.getWithName(vehicleType.name);

		if (!isUniqueVehicleType) throw new ValidationException(Messages.NAME_MUST_BE_UNIQUE);

		return this.vehicleTypeRepository.create(vehicleType).catch((error) => {
			this.logger.error(error.message);
			throw new Exception(Messages.EXCEPTION_DATABASE);
		});
	}
}
