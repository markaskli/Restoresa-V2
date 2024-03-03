import { Restaurant } from "./restaurant"

export interface Basket {
    id: number
    buyerId: string
    clientSecret: string
    paymentIntentId: string
    reservedDate: string,
    reservedTime: string,
    seats: number 
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