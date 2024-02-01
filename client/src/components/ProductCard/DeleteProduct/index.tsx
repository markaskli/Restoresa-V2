import requests from "../../../API/requests"
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./styles.module.css"

interface Props {
    id: number
    setReload: React.Dispatch<React.SetStateAction<boolean>>
}


const DeleteProduct = ({id, setReload}: Props) => {
    const handleOnClick = (id: number) => {
        requests.Product.delete(id)
        setReload(prev => !prev)
    }

    return (
        <button className={styles.button} onClick={() => handleOnClick(id)}>
            <DeleteIcon/>
        </button>
    )
}

export default DeleteProduct