/* eslint-disable @typescript-eslint/ban-types */
import { VehicleType } from '../../../../domain/entities/vehicle-type';
import { Inject, Injectable } from '@nestjs/common';
import { VehicleTypeRepository } from '../../../../domain/repositories/vehicle-type.repository';

import {vehicleTypeDefault} from '../vehicleTypesDefault'

@Injectable()
export class VehicleTypeMemoryRepository implements VehicleTypeRepository {
	vehicleTypes: Array<VehicleType>;
	constructor() {

		this.vehicleTypes = vehicleTypeDefault

	}

	public async create(vehicleType: VehicleType): Promise<VehicleType> {
		const count = (await this.getAll()).length;
		vehicleType._id = count + 1; // auto-increment falso

		this.vehicleTypes.push(vehicleType);
		return vehicleType;
	}

	public async getAll(): Promise<VehicleType[]> {
		return this.vehicleTypes;
	}

	public async getWithId(_id: number): Promise<VehicleType> {
		throw 'Aun no esta implementado';
	}

	public async get(id: number): Promise<VehicleType> {
		return this.vehicleTypes.find((type) => type._id == id);
	}

	public async getWithName(name: string): Promise<VehicleType> {
		return this.vehicleTypes.find((type) => type.name == name);
	}

	public async save(entity: Partial<VehicleType>): Promise<VehicleType> {
		throw 'Aun no esta implementado';
	}

	public async delete(id: number): Promise<boolean> {
		throw 'Aun no esta implementado';
	}
}
