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
