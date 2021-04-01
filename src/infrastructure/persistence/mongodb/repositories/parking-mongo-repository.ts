/* eslint-disable @typescript-eslint/ban-types */
import { Parking } from '../../../../domain/entities/parking';
import { MongoRepository } from '../mongo-repository';
import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { ParkingRepository } from '../../../../domain/repositories/parking.repository';

@Injectable()
export class ParkingMongoRepository extends MongoRepository implements ParkingRepository {
	constructor(@Inject('URL_CONNECTION') url: string) {
		super(url);
	}

	protected moduleName(): string {
		return 'Parking';
	}

	public async create(parking: Parking): Promise<Parking> {
		const collection = await this.collection();
		const response = await collection.insertOne(parking);
		parking._id = response.insertedId;
		return parking;
	}

	public async getAll(): Promise<Parking[]> {
		const collection = await this.collection();
		return collection.find().toArray();
	}

	public async getByQuery(query: object = {}): Promise<Parking> {
		const collection = await this.collection();
		return collection.findOne(query);
	}

	public async get(id: string): Promise<Parking> {
		const collection = await this.collection();
		return collection.findOne({ _id: new ObjectId(id) });
	}

	public async save(parking: Parking): Promise<Parking | any> {
		const collection = await this.collection();
		const _id = new ObjectId(parking._id);
		return (await collection.updateOne({ _id }, { $set: parking })).modifiedCount == 1;
	}

	public async delete(id: string): Promise<boolean> {
		throw 'Aun no esta implementado';
	}

	public async deleteByQuery(query: object): Promise<boolean> {
		const collection = await this.collection();
		const response = await collection.deleteMany(query);
		return !!response.deletedCount
	}
}
