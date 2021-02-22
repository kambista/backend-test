import { IRepository } from '../shared/interfaces/repository';
import { Vehicle } from '../entities/vehicle';

export interface VehicleRepository extends IRepository<String, Vehicle> {
	create(entity: Partial<Vehicle>): Promise<Vehicle>;
	getAll(): Promise<Array<Vehicle>>;
	get(id: String): Promise<Vehicle>;
	getOneByQuery(query: object): Promise<Vehicle>;
	getManyByQuery(query: object): Promise<Array<Vehicle>>;
	getVehiclesWithVehicleType(vehicleTypeId: number): Promise<Array<Vehicle>>;
	getVehicleWithLicensePlate(licensePlate: string): Promise<Vehicle>;
	save(entity: Partial<Vehicle>): Promise<Vehicle>;
	delete(id: String): Promise<boolean>;
	updatePartial(query: object, parameter: Partial<Vehicle>): Promise<boolean>;
}
