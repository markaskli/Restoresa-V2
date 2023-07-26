import { Product } from "./product"

export interface Restaurant {
    restaurantId: number
    name: string
    address: string
    pictureUrl: string
    description: string
    products: Product[]
}