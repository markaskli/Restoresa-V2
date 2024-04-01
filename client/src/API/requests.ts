import axios, { AxiosResponse } from "axios"
import { FormValues } from "../components/CreateRestaurant";
import { ProductFormValues } from "../components/CreateProduct";
import { TimeSlotDTO } from "../components/SubmitTimeSlots";
import { CreateReservationDTO, ReservationDTO } from "../types/reservation";
import { CreateUser, LoginDto } from "../types/user";


axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Basket = {
    get: () => requests.get('Basket'),
    addItem: (productId: number, quantity = 1, restaurantId: number) => requests.post(`basket?productId=${productId}&quantity=${quantity}&restaurantId=${restaurantId}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
    addReservationDetails: (reservationDetails: ReservationDTO) => requests.post("basket/addDetails", reservationDetails)
}

const RestaurantRequests = {
    getRestaurant: (id: number) => requests.get(`Restaurant/${id}`),
    getRestaurants: () => requests.get("Restaurant"),
    add: (restaurant: FormValues) => requests.post("Restaurant", restaurant),
    delete: (id: number) => requests.delete(`Restaurant?restaurantId=${id}`),
    getTimeSlots: (id: number, weekDay: string) => requests.get(`Restaurant/timeslots?id=${id}&weekDay=${weekDay}`),
    addTimeSlots: (id: number, weekDay: string, data: TimeSlotDTO) => requests.post(`Restaurant/addSlots?id=${id}&weekday=${weekDay}`, data)
}

const Product = {
    add: (product: ProductFormValues) => requests.post("Product", product),
    delete: (id: number) => requests.delete(`Product?id=${id}`)
}

const Payments = {
    createPaymentIntent: () => requests.post("Payment", {})  
}

const Reservation = {
    createReservation: (reservation: CreateReservationDTO) => requests.post("Reservation", reservation),
    getReservations: (userId: string) => requests.get(`Reservation/user?userId=${userId}`)
}

const User = {
    registerUser: (user: CreateUser) => requests.post("Account/register", user),
    login: (loginData: LoginDto) => requests.post("Account/login", loginData)
}

const agent = {
    Basket,
    Product,
    RestaurantRequests,
    Payments,
    Reservation,
    User
}

export default agent