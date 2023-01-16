import React, { useEffect } from "react";
import {filterByDiet, getDiets} from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";


export default function FilterDiet() {

    const allDiets = useSelector(state => state.diets)
    const dispatch = useDispatch();

    useEffect(() => {
        if(!allDiets.length)
        dispatch(getDiets());
    }, [allDiets, dispatch]);

    function handleChange(e) {
        e.preventDefault();
        dispatch(filterByDiet(e.target.value));
    }

    return (
        <div>
            <select onChange={handleChange}>
                <option value="all">--Choose your diet--</option>
                {allDiets.map((diet) => { return (
                    <option key={diet.id} value={diet.name}>
                    {diet.name}
                    </option>
                )})}
            </select>
        </div>
    )
}