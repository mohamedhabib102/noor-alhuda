import { MongoClient } from "mongodb";



const url = process.env.MONGODB_URI;

let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (url) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(url);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(url);
    clientPromise = client.connect();
  }
} else {
  // During build or if missing, we don't want to crash the process immediately.
  // Instead, we provide a rejected promise that will throw only when used.
  clientPromise = Promise.reject(new Error("Please define the MONGODB_URI in your environment variables."));

  // Log a warning during build/production so the dev knows why DB features will fail
  if (process.env.NODE_ENV === "production") {
    console.warn("⚠️ Warning: MONGODB_URI environment variable is missing.");
  }
}

export default clientPromise;