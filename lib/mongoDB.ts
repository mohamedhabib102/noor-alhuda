import { MongoClient } from "mongodb";



const url = process.env.MONGODB_URI;

if (!url){
    throw new Error("Please define the MONGODB_URI in your .env.local")
};
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}
if (!global._mongoClientPromise) {
  const client = new MongoClient(url);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;