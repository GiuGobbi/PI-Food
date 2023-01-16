import { getDetail } from "../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeButton from "../HomeButton/HomeButton.js"
import styles from "./detail.module.css"

export default function Detail() {
const dispatch = useDispatch();
const detail = useSelector(state => state.detail)
const {id} = useParams();

useEffect(() => {
    dispatch(getDetail(id));
}, [dispatch, id]);

return (
        <div>
            <HomeButton/>
            <br/>
            <div>
                <br/>
                <div>
                    <h1 className={styles.titulo1}>{detail.name}</h1>
                    <h2 className={styles.titulo2}>{detail.healthScore}</h2>
                </div>
                <img className={styles.imagenDetail} src={detail.image} alt="mmmm"></img>
                <br/>
                <div className={styles.summaryDiv}>
                    <h3>Summary</h3>
                    <p className={styles.summary}>{detail.summary?.replace(/<[^>]*>/g, '')}</p>
                </div>
                <div className={styles.divdiets}>
                    <h3 className={styles.titulo3}>Types of diets</h3>
                    <ul className={styles.listaEntera}>
                    {detail.diets?.map((diet, index)=> <li className={styles.liItem} key={index}>{diet}</li>)}
                    </ul>
                </div>
                <br/>
                <div className={styles.divtypes}>
                <h3>Type of dish</h3>
                    <ul className={styles.listaEntera}>
                    {detail.dishTypes?.map((type, index)=> <li className={styles.liItem}  key={index}>{type}</li>)}
                    </ul>
                </div>
                <div className={styles.pasoapasoDiv}>
                    <h3>Step by step</h3>
                    <p>{detail.stepByStep?.map((step, index) => <p className={styles.pasoapaso}>{index+1}- {step}</p>)}</p>
                </div>
            </div>
        </div>
    )
};