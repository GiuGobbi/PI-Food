import React, { useEffect } from "react";
import {filterByDiet, getDiets} from "../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";


export default function FilterDiet() {

    const allDiets = useSelector(state => state.diets)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDiets());
    });

    function handleChange(e) {
        e.preventDefault();
        dispatch(filterByDiet(e.target.value));
    }

    return (
        <div>
            <label>Choose your diet</label>
            <select onChange={handleChange}>
                <option value="all">All</option>
                {allDiets?.map((diet, key) => {
                    return (
                        <option key={key} value={diet.name}>{diet.name}</option>
                    )
                })}
            </select>

        </div>
    )
}