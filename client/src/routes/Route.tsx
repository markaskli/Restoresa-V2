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
import IndividualReservationInfo from "../components/IndividualReservationInfo";
import SignUp from "../features/SignUp";
import SignIn from "../features/SignIn";
import ErrorPage from "../features/ErrorPage";
import PersonalRestaurants from "../features/PersonalRestaurants";
import PersonalRestaurantMenu from "../features/PersonalRestaurantMenu";

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
              path: "personal-restaurants/:id/timeslots",
              element: <RestaurantTimeSlots/>
            },
            {
              path: "personal-restaurants",
              element: <PersonalRestaurants/>
            },
            {
              path: "personal-restaurants/:id",
              element: <PersonalRestaurantMenu/>
            },
            {
              path: "reservation",
              element: <RestaurantPrompt/>
            },
            {
              path: "reservation/:id",
              element: <IndividualReservationInfo/>
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
            },
            {
              path: "sign-up",
              element: <SignUp/>
            },
            {
              path: "sign-in",
              element: <SignIn/>
            },
            {
              path: 'server-error',
              element: <ErrorPage/>
            }
          ],
    }
    
])