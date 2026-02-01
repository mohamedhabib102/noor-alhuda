import { getAllHeros } from "@/lib/heroDB";
import { NextResponse } from "next/server";




export async function GET() {
    try {
        const data = await getAllHeros();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 400 });
    }
}