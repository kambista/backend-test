import { IRepository } from '../shared/interfaces/repository';
import { Parking } from '../entities/parking';

export interface ParkingRepository extends IRepository<String, Parking> {
	create(entity: Partial<Parking>): Promise<Parking>;
	getAll(): Promise<Array<Parking>>;
	get(id: String): Promise<Parking>;
	getByQuery(query: object): Promise<Parking>;
	save(entity: Partial<Parking>): Promise<Parking>;
	delete(id: String): Promise<boolean>;
	deleteByQuery(query:object): Promise<boolean>;
}
