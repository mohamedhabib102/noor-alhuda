import clientPromise from "./mongoDB";
import { HeroDB } from "@/types/Types";
import { ObjectId } from "mongodb";

export async function getAllHeros(): Promise<HeroDB[]> {
  const client = await clientPromise;
  const db = client.db("HERO"); 
  const heros = await db.collection<HeroDB>("heroSection").find({}).toArray();
  return heros;
}

// CREATE hero(s)
export async function createHero(hero: HeroDB | HeroDB[]) {
  const client = await clientPromise;
  const db = client.db("HERO");
  const collection = db.collection<HeroDB>("heroSection");

  if (Array.isArray(hero)) {
    return collection.insertMany(hero);
  } else {
    return collection.insertOne(hero);
  }
}


// DELETE hero(s)
export async function deleteHero(id: string) {
  const client = await clientPromise;
  const db = client.db("HERO");
  const collection = db.collection<HeroDB>("heroSection");
  return collection.deleteOne({ _id: new ObjectId(id) });
}
