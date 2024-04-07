import { useNavigate, useParams } from "react-router-dom";
import ListProducts from "../../components/ListProducts";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/store";
import { fetchRestaurantAsync } from "../../stores/slices/menuSlice";
import CreateProduct from "../../components/CreateProduct";
import styles from './styles.module.css'
import { Button, Container, CssBaseline } from "@mui/material";




export default function PersonalRestaurantMenu() {
    const {id} = useParams()
    const [reload, setReload] = useState(false)
    const {restaurant} = useAppSelector(state => state.menu)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            dispatch(fetchRestaurantAsync({restaurantId: parseInt(id)}))
        }      
    }, [dispatch, id])

    if (!restaurant) return <h1>Restaurant not found</h1>

    const handleNavigate = () => {
        navigate("timeslots", {state: {restaurant}})
    }

    return (
      <>
        <Container className={styles.buttonBox}>
          <Button
            className={styles.button}
            variant="contained"
            onClick={handleNavigate}
          >
            {" "}
            Time Slots
          </Button>
          <CreateProduct id={restaurant.id} setReload={setReload} />
        </Container>
        <ListProducts restaurant={restaurant} setReload={setReload} />
      </>
    );
}