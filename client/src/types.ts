import { categoryType } from "./consts/categories"

export type GameType = {
    category: categoryType, 
    price: string, 
    name: string,
    images: string[],
    mainImage: string,
    inWishList: boolean, 
    isPurchased: boolean,
    isPublished: boolean,
}

export type GameDataType = {
    [key: string]: categoryType
}