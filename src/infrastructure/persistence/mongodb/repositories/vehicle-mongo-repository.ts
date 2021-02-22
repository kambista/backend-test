/* eslint-disable @typescript-eslint/ban-types */
import { VehicleRepository } from '../../../../domain/repositories/vehicle.repository';
import { MongoRepository } from '../mongo-repository';
import { Inject, Injectable } from '@nestjs/common';
import { Vehicle } from '../../../../domain/entities/vehicle';
import { ObjectId } from 'mongodb';

@Injectable()
export class VehicleMongoRepository extends MongoRepository implements VehicleRepository {
	constructor(@Inject('URL_CONNECTION') url: string) {
		super(url);
	}
	public async getOneByQuery(query: object): Promise<Vehicle> {
		const collection = await this.collection();
		console.log(query)
		return collection.findOne(query);
	}

	public async getManyByQuery(query: object): Promise<Vehicle[]> {
		const collection = await this.collection();
		console.log(query)
		return collection.find(query).toArray();
	}

	public  async getVehiclesWithVehicleType(vehicleTypeId: number): Promise<Array<Vehicle>> {
		const collection = await this.collection();
		return collection.find({"vehicleType._id":vehicleTypeId}).toArray();
	}
	public  async getVehicleWithLicensePlate(licensePlate: string): Promise<Vehicle> {
		const collection = await this.collection();
		return collection.findOne({"licensePlate":licensePlate});
	}

	protected moduleName(): string {
		return 'Vehicles';
	}

	public async create(vehicle: Vehicle): Promise<Vehicle> {
		const collection = await this.collection();
		const response = await collection.insertOne(vehicle);
		vehicle._id = response.insertedId;
		return vehicle;
	}

	public async getAll(): Promise<Vehicle[]> {
		const collection = await this.collection();
		return collection.find().toArray();
	}

	public async get(id: string): Promise<Vehicle> {
		throw 'Aun no esta implementado';
	}

	public async updatePartial(query: object = {}, parameter: Partial<Vehicle>): Promise<boolean> {
		const collection = await this.collection();
		const update = {
			$set: {
				...parameter
			}
		};
		return (await collection.updateMany(query, update)).modifiedCount > 0;
	}

	public async save(entity: Vehicle): Promise<Vehicle | any> {
		const collection = await this.collection();
		const updated = {
			$set: entity
		};
		return (await collection.updateOne({ _id: new ObjectId(entity._id) }, updated)).modifiedCount == 1;
	}

	public async delete(id: string): Promise<boolean> {
		throw 'Aun no esta implementado';
	}
}
