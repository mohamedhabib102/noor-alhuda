 import { heroDB } from "@/lib/HeroDB";
import { NextResponse } from "next/server";


 export async function GET() {
    try {
       return NextResponse.json(heroDB, {status: 200})
    } catch (error) {
       console.log(error)
       return NextResponse.json({message: "Error fetching data"}, {status: 400})
    }
 }