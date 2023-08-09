import axios, { AxiosResponse } from "axios"

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
    getRestaurantProducts: (id: number) => requests.get(`Products/restaurant?restaurantId=${id}`),
}

const Restaurant = {
    getRestaurant: (id: number) => requests.get(`Restaurants/${id}`),
    getRestaurants: () => requests.get("Restaurants")
}

const agent = {
    Basket,
    Menu,
    Restaurant
}

export default agent