import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../stores/store"
import LoadingComponent from "../../components/LoadingComponent"
import styles from './styles.module.css'
import CreateRestaurant from "../../components/CreateRestaurant"
import RestaurantList from "../../components/RestaurantsList"
import { fetchRestaurantsOfUser, personalRestaurantSelectors } from "../../stores/slices/personalRestaurantSlice"
import { Container } from "@mui/material"

function PersonalRestaurants() {
    const [reload, setReload] = useState(true)
    const restaurants = useAppSelector(personalRestaurantSelectors.selectAll)
    const {restaurantsLoaded, status} = useAppSelector(state => state.personalRestaurant);
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (!restaurantsLoaded && user) {
            dispatch(fetchRestaurantsOfUser({userId: user.id}))
        }
    }, [user, dispatch, restaurantsLoaded])

    if (status.includes("pending")) return <LoadingComponent message="Loading restaurant information.."/>
    if (!user) return <h1>You are not signed-in</h1>


    return (
        <Container>
            <div className={styles.headerDiv}>
                <h1>Your restaurants</h1>
                <CreateRestaurant setReload={setReload}/>
            </div>
            <RestaurantList restaurants={restaurants} setReload={setReload} />
        </Container>
        
        
    )
}

export default PersonalRestaurants