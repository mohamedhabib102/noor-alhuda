import { Radios } from "@/lib/radioDB";
import { NextResponse } from "next/server";



export async function GET(){
    try {
       const DB = Radios;
       return NextResponse.json({data: DB}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch radios"}, {status: 404})
    }
}