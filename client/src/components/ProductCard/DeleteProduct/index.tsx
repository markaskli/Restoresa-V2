import requests from "../../../API/requests"
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./styles.module.css"

interface Props {
    id: number
    trigger: React.Dispatch<React.SetStateAction<boolean>>
}


const DeleteProduct = ({id, trigger}: Props) => {
    const handleOnClick = (id: number) => {
        requests.Product.delete(id)
        trigger(true)
    }

    return (
        <button className={styles.button} onClick={() => handleOnClick(id)}>
            <DeleteIcon/>
        </button>
    )
}

export default DeleteProduct