import React, { useState } from "react";
import {searchByName} from "../../redux/actions.js"
import { useDispatch } from "react-redux";
import styles from "./nav.module.css"

export default function Nav({paginate}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit (e){
        e.preventDefault()
        dispatch(searchByName(name));
        paginate(1)
        setName('');
    }

    return (
        <div>
        <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    className={styles.inputSearch}
                    type="text"
                    placeholder="Search recipe..."
                    value={name}
                    onChange={handleChange}
                />
                <button className={styles.boton} type="submit">
                    Search
                </button>
            </form>
        </div>
    )
};