import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../../cooking.png"
import styles from "./landingpage.module.css"

export default function LandingPage() {
    const navigate = useNavigate();
    const goHome = () => navigate("/home");
  
    return (
      <div>
        <button className={styles.boton} onClick={goHome}>
          WELCOME!
        </button>
        <img src={img} alt='' />
      </div>
    );
  }