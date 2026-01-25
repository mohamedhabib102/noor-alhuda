import { Post, Radio } from "@/types/Types";
import req from "./axios"
import axios from "axios";



export const getAllPosts = async (): Promise<Post[]> => {
    try {
        const res = await req.get("/api/Alhoda_Alnabawya/GetAllPosts");
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};


export const getAllRadios = async (): Promise<Radio[]> => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/radio`);
        return res.data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

