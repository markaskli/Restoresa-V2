import { OrderedProduct } from "./orderedProduct";

export interface Reservation {
    id: number,
    submitDate: string,
    reservedDate: string,
    reservedTime: string,
    cost: number,
    seats: number,
    status: string,
    orderedProducts: OrderedProduct[],
    userId: string,
    restaurantId: number
}

export interface CreateReservationDTO {
    reservedDate: string,
    reservedTime: string,
    seats: number,
    userId: string,
    restaurantId: number
}

export interface ReservationDTO {
    reservedDate: string,
    reservedTime: string,
    seats: number 
}