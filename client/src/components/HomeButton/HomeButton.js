import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./homebutton.module.css"

export default function HomeButton() {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate("/home")
    }
    return (
        <button className={styles.boton} onClick={handleOnClick}>Home</button>
    )
};

