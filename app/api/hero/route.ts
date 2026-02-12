import { createHero, deleteHero, getAllHeros } from "@/lib/hero-db";
import { HeroDB } from "@/types/Types";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
   try {
      const heros = await getAllHeros();
      return NextResponse.json(heros, { status: 200 })
   } catch (error) {
      console.log(error)
      return NextResponse.json(
         { message: "Error fetching data" }, 
         { status: 400 }
      )
   }
}


export async function POST(req: NextRequest) {
   try {
      const newHero:HeroDB = await req.json();
      const now = new Date();
      newHero.createdAt = now.toISOString();

      // create new hero
      await createHero(newHero);
      return NextResponse.json(
         { message: "Hero created successfully", newHero }
         ,{ status: 200 })
   } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Error creating data" }, 
      { status: 400 })
   }
}


export async function DELETE(req: NextRequest) {
   try {
      const id = req.nextUrl.searchParams.get("id");

      if (!id) {
         return NextResponse.json({ message: "No id provided" }, { status: 400 })
      }

      await deleteHero(id);

      return NextResponse.json({ message: "Hero deleted successfully" }, { status: 200 })
   } catch (error) {
      console.log(error)
      return NextResponse.json({ message: "Error deleting data" }, { status: 500 })
   }
}