import { useNavigate } from "react-router-dom";
import styles from "./createbutton.module.css"

export default function CreateButton() {

const navigate = useNavigate()
const handleOnClick= () => {
    navigate("/create")
}
    return (
        <button className={styles.boton} onClick={handleOnClick}>Create your recipe</button>
    )
};