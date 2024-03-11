import { OrderedProduct } from "./orderedProduct";
import { Restaurant, RestaurantDTO } from "./restaurant";

export interface Reservation {
    id: number,
    submitDate: string,
    reservedDate: string,
    reservedTime: string,
    cost: number,
    seats: number,
    paymentStatus: string,
    orderedProducts: OrderedProduct[],
    userId: string,
    restaurant: RestaurantDTO
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