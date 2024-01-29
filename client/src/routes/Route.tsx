import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Catalog from "../features/Catalog";
import Homepage from "../features/Homepage/Homepage";
import RestaurantMenu from "../features/IndividualRestaurant/RestaurantMenu";
import OrderPage from "../features/OrderPage/OrderPage";
import RestaurantPrompt from "../features/Reservation/RestaurantPrompt";

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
              element: <RestaurantMenu/>
            },
            {
              path: "reservation",
              element: <RestaurantPrompt/>
            },
            {
              path: "order",
              element: <OrderPage/>
            }

          ],
    }
    
])