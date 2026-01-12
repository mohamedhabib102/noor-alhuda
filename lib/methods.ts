import { Post } from "@/types/Types";
import req from "./axios"



 export const getAllPosts = async (): Promise<Post[]> => {
    try {
        const res = await req.get("/api/Alhoda_Alnabawya/GetAllPosts");
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
