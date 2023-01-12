import React, { useState } from "react";
import {searchByName} from "../redux/actions.js"
import { useDispatch } from "react-redux";

export default function Nav() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }


    function handleSubmit (e){
        e.preventDefault()
        dispatch(searchByName(name));
        setName('');
    }


    return (
        <div>
        <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={name}
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit">
                    Search
                </button>
            </form>
        </div>
    )
};