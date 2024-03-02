import { Product } from "./product"
import { WorkingHours } from "./workingHours"

export interface Restaurant {
    id: number
    name: string
    address: string
    pictureUrl: string
    description: string
    maxPeopleServedPerTable: number
    products: Product[]
    workingHours: WorkingHours[]
}

export interface RestaurantDTO {
    id: number
    name: string
    address: string
    pictureUrl: string
    description: string
    maxPeopleServedPerTable: number
    products: Product[]
}