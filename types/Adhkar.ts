import { IconType } from "react-icons";


export interface AdhkarItem {
    id: number;
    title: string;
    icon: IconType;
}


type Zekr = {
    audio: string;
    count: number;
    filename: string;
    id: number;
    text: string;
}


export interface Adhkar {
    audio: string;
    array: Zekr[];
    category: string;
    filename: string;
    id: number;
}

export interface Post {
    postID: number,
    personID: number,
    postTitle: string,
    postContent: string,
    createdAt: string,
    personName: string,
    image: string;
    image_Person: string;
    image_Post: string;
}