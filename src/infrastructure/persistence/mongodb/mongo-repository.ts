import { Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';
import { MongoClientFactory } from './mongo-client-factory';

@Injectable()
export abstract class MongoRepository {
	// constructor(private _client: Promise<MongoClient>) {}

	private readonly _client: Promise<MongoClient>;
	constructor(url: string) {
		this._client = MongoClientFactory.createClient(this.moduleName(), { url });
	}

	protected abstract moduleName(): string;

	protected client(): Promise<MongoClient> {
		return this._client;
	}

	protected async collection(): Promise<Collection> {
		return (await this._client).db().collection(this.moduleName());
	}
}
