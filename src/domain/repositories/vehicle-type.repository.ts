import { VEHICLE_TYPE } from '../shared/consts';
import { IRepository } from '../shared/interfaces/repository';
import { VehicleType } from './../entities/vehicle-type';

export interface VehicleTypeRepository extends IRepository<number, VehicleType> {
	create(entity: Partial<VehicleType>): Promise<VehicleType>;
	getAll(): Promise<Array<VehicleType>>;
	get(id: VEHICLE_TYPE|number): Promise<VehicleType>;
	getWithName(name: string): Promise<VehicleType>;
	save(entity: Partial<VehicleType>): Promise<VehicleType>;
	delete(id: VEHICLE_TYPE|number): Promise<boolean>;
}
