import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

interface GlobalWithMongoClientPromise {
  _mongoClientPromise?: Promise<MongoClient>;
}

declare const global: GlobalWithMongoClientPromise & typeof globalThis;

if (!url) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(url);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(url);
  clientPromise = client.connect();
}

export async function getClient() {
  const client = await clientPromise;
  return client;
}

export async function getDB() {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
