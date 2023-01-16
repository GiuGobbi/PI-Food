import React from "react";
import { Link } from "react-router-dom";
import styles from "./recipecard.module.css"

export default function RecipeCard(props) {
    return (
        <div>
            <div className={styles.box}>
                <h1 className={styles.titulo}>{props.name}</h1>
                <Link to={`/home/${props.id}`}>
                <img className={styles.imagen} src={props.image} alt="recipe"/>
                </Link> 
                <div className={styles.detaildiv}>
                <div className={styles.arrays}>
                    <h3 className={styles.titulito}>Type of diets</h3>
                    <ul className={styles.list}>
                    {props.diets.map((diet, index)=> <li key={index}>{diet}</li>)}
                    </ul>
                </div>
                <div className={styles.arrays}>
                    <h3 className={styles.titulito}>Type of dish</h3>
                    <ul className={styles.list}>
                    {props.dishTypes.map((type, index)=> <li key={index}>{type}</li>)}
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
};