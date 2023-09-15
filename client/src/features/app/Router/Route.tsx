import { createBrowserRouter } from "react-router-dom";
import App from "../../../App";
import Catalog from "../../catalog/Catalog";
import Homepage from "../Homepage/Homepage";
import RestaurantMenu from "../../IndividualRestaurant/RestaurantMenu";
import OrderPage from "../../OrderPage/OrderPage";
import RestaurantPrompt from "../../Reservation/RestaurantPrompt";

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