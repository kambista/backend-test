import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

type MongoConfig = { url: string };

@Injectable()
export class MongoClientFactory {
	private static clients: { [key: string]: MongoClient } = {};

	static async createClient(contextName: string, config: MongoConfig): Promise<MongoClient> {
		let client = MongoClientFactory.getClient(contextName);
		if (!client) {
			client = await MongoClientFactory.createAndConnectClient(config);
			MongoClientFactory.registerClient(client, contextName);
		}
		return client;
	}

	private static getClient(contextName: string): MongoClient | null {
		return MongoClientFactory.clients[contextName];
	}

	private static async createAndConnectClient(config: MongoConfig): Promise<MongoClient> {
		const client = new MongoClient(config.url, { useUnifiedTopology: true, ignoreUndefined: true });
		return client.connect();
	}

	private static registerClient(client: MongoClient, contextName: string): void {
		MongoClientFactory.clients[contextName] = client;
	}
}
