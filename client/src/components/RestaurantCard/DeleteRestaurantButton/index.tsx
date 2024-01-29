import requests from "../../../API/requests";
import styles from "./styles.module.css"
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
    restaurantId: number
}

const handleClick = (id: number) => {
    //e.stopPropagation();
    requests.RestaurantRequests.delete(id)
} 

const DeleteRestaurantButton = ({restaurantId} : Props) => {
    return (
        <button style={{background: "none", border: "none"}} onClick={() => handleClick(restaurantId)}>
            <DeleteIcon/>
        </button>
    )
}

export default DeleteRestaurantButton