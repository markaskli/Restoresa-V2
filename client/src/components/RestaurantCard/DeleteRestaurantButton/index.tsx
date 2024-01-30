import DeleteIcon from '@mui/icons-material/Delete';
import requests from '../../../API/requests';

interface Props {
    restaurantId: number
}

const handleClick = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    requests.RestaurantRequests.delete(id)
    //console.log(id)
} 

const DeleteRestaurantButton = ({restaurantId} : Props) => {
    return (
        <button style={{background: "none", border: "none"}} onClick={(e) => handleClick(restaurantId, e)}>
            <DeleteIcon/>
        </button>
    )
}

export default DeleteRestaurantButton