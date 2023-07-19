import { Product } from "./product"

export interface Restaurant {
    id: number
    name: string
    address: string
    pictureUrl: string
    description: string
    products: Product[]
}