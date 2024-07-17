import { NewsImage } from "./news-image";

export interface News {
    id?: number,
    title: string,
    description: string,
    newsDate?: string;
    newsImage?: NewsImage
}
