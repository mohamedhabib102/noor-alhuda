import { IconType } from "react-icons";


export interface AdhkarItem {
    id: number;
    title: string;
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
    postID: number;
    personID: number;
    postTitle: string;
    postContent: string;
    createdAt: string;
    personName: string;
    shareName: string;
    image_Post: string;
    image_Person: string;
    share: boolean;
    imageShare: string;
}

export interface Question {
  questionID: number;
  personID: number;
  questionContent: string;
  responseContent: string;
  personName: string;
  image: string;
  isFound: boolean;
}

export interface Hero {
    id: number;
    type: string;
    title: string;
    link: string;
    image: string;
    description?: string;
}