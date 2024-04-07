import axios, { AxiosError, AxiosResponse } from "axios"
import { FormValues } from "../components/CreateRestaurant";
import { ProductFormValues } from "../components/CreateProduct";
import { TimeSlotDTO } from "../components/SubmitTimeSlots";
import { CreateReservationDTO, ReservationDTO } from "../types/reservation";
import { CreateUser, LoginDto } from "../types/user";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../routes/Route";


axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().user.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        console.log(status);
        toast.error(data.title);
        break;
      case 403:
        toast.error("You are not allowed to do that!");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

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
    getRestaurantsOfUser: (userId: string) => requests.get(`Restaurant/user?userId=${userId}`),
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
    login: (loginData: LoginDto) => requests.post("Account/login", loginData),
    currentUser: () => requests.get('Account')
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