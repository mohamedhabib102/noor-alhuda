import { adhkar, categories } from "@/lib/adhkarDB";
import { NextResponse , NextRequest} from "next/server";



export async function GET(req: NextRequest){
    try {
        const {searchParams} = new URL(req.url);

        const type = searchParams.get("type");
        const category = searchParams.get("category");
        const id = searchParams.get("id");

        if (type === "category"){
            return NextResponse.json(categories, {status: 200})
        }

        if (category && id) {
            const cat = adhkar.find(c => c.category === category);
            const zekr = cat?.array.find(z => z.id === Number(id));
            if (zekr) {
                return NextResponse.json({ ...zekr, category: cat?.category }, {status: 200});
            }
            return NextResponse.json({message: "Zekr not found"}, {status: 404});
        }

        const enrichedAdhkar = adhkar.map(cat => ({
            ...cat,
            array: cat.array.map(z => ({ ...z, category: cat.category }))
        }));

        return NextResponse.json(enrichedAdhkar, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Error fetching data"}, 
        {status: 400})
    }
}