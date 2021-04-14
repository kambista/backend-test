const MongoClient = require('mongodb').MongoClient;

// Connection URL
const DB_NAME = process.env.DB_NAME;
const MONGO_URL = process.env.MONGO_URL;
let cachedDb = null;

export class MongoDbDAOFactory {
  getConnection = () => {
    console.log('=> connect to database');

    if (cachedDb && cachedDb.serverConfig.isConnected()) {
      console.log('=> using cached database instance');
      return Promise.resolve(cachedDb);
    }

    console.log('=> Not have cacheddb');

    return new MongoClient.connect(MONGO_URL).then((client) => {
      cachedDb = client.db(DB_NAME);
      return cachedDb;
    });
  };
}
