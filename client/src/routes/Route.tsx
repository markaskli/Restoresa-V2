import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Catalog from "../features/Catalog";
import Homepage from "../features/Homepage/Homepage";
import RestaurantMenu from "../features/RestaurantMenu";
import OrderPage from "../features/OrderPage/OrderPage";
import RestaurantPrompt from "../features/ReservationPrompt";
import RestaurantTimeSlots from "../features/RestaurantTimeSlots";
import Checkout from "../features/Checkout";
import UserProfile from "../features/UserProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
              path: "",
              element: <Homepage />,
            },
            {
              path: "restaurants",
              element: <Catalog/>
            },
            {
              path: "restaurants/:restaurantId",
              element: <RestaurantPrompt/>
            },
            {
              path: "restaurants/:restaurantId/menu",
              element: <RestaurantMenu/>
            },
            {
              path: "restaurants/:restaurantId/menu/timeslots",
              element: <RestaurantTimeSlots/>
            },
            {
              path: "reservation",
              element: <RestaurantPrompt/>
            },
            {
              path: "order",
              element: <OrderPage/>
            },
            {
              path: "checkout",
              element: <Checkout/>
            },
            {
              path: "profile",
              element: <UserProfile/>
            }

          ],
    }
    
])