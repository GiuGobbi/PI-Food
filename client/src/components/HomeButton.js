import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate("/home")
    }
    return (
        <button onClick={handleOnClick}>return</button>
    )
};

