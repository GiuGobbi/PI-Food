import { getDetail } from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeButton from "./HomeButton"

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
            <h1>{detail.name}caccaaaa</h1>
            <h2>{detail.healthScore}</h2>
            <img src={detail.image} alt="mmmm"></img>
            <br/>
            <div>{detail.diets?.map((diet, index)=> <p key={index}>{diet}</p>)}</div>
            <p>{detail.dishTypes?.join(", ")}</p>
            <p>{detail.summary?.replace(/<[^>]*>/g, '')}</p>
            <p>{detail.stepByStep?.map((step, index) => <p>{index+1}: {step}</p>)}</p>
        </div>
    )
};