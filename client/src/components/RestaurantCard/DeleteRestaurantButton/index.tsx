import DeleteIcon from '@mui/icons-material/Delete';
import requests from '../../../API/requests';
import { Button } from '@mui/material';

interface Props {
    restaurantId: number
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}



const DeleteRestaurantButton = ({restaurantId, setReload} : Props) => {

    const handleClick = (id: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        requests.RestaurantRequests.delete(id)
        setReload(true)
        //console.log(id)
    } 

    return (
        <Button style={{background: "none", border: "none"}} onMouseDown={(e) => handleClick(restaurantId, e)}>
            <DeleteIcon/>
        </Button>
    )
}

export default DeleteRestaurantButton