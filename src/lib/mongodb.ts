import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (!dbName) {
  throw new Error('Please add your DB name to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

interface GlobalWithMongoClientPromise {
  _mongoClientPromise?: Promise<MongoClient>;
}

declare const global: GlobalWithMongoClientPromise & typeof globalThis;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDB() {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
