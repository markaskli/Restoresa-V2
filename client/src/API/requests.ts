import axios, { AxiosResponse } from "axios"
import { Restaurant } from "../types/restaurant";
import { FormValues } from "../components/CreateRestaurant";

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
    removeItem: (productId: number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)  
}

const Menu = {
    get: () => requests.get("Products"),
    getRestaurantProducts: (id: number) => requests.get(`Products/restaurant?id=${id}`),
}

const RestaurantRequests = {
    getRestaurant: (id: number) => requests.get(`Restaurant/${id}`),
    getRestaurants: () => requests.get("Restaurant"),
    addRestaurant: (restaurant: FormValues) => requests.post("Restaurant", restaurant),
    delete: (id: number) => requests.delete(`Restaurant/${id}`)
}

const agent = {
    Basket,
    Menu,
    RestaurantRequests
}

export default agent