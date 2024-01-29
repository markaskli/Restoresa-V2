import { Product } from "./product"
import { WorkingHours } from "./workingHours"

export interface Restaurant {
    id: number
    name: string
    address: string
    pictureUrl: string
    description: string
    products: Product[]
    workingHours: WorkingHours[]
}