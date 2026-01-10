import { adhkar, categories } from "@/lib/adhkarDB";
import { NextResponse , NextRequest} from "next/server";



export async function GET(req: NextRequest){
    try {
        const {searchParams} = new URL(req.url);

        const type = searchParams.get("type");

        if (type === "category"){
            return NextResponse.json(categories, {status: 200})
        }

        return NextResponse.json(adhkar, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error fetching data"}, {status: 200})
    }
}