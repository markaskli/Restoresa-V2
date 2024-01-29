import { Restaurant } from "./restaurant"

export interface Basket {
    id: number
    buyerId: string
    items: BasketItem[] 
    restaurant: Restaurant
}

export interface BasketItem {
    productId: number
    quantity: number
    type: string
    title: string
    description: string
    price: number
    imageUrl: string
}