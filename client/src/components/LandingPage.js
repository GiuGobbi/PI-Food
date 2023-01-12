import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../cooking.png"

export default function LandingPage() {
    const navigate = useNavigate();
    const goHome = () => navigate("/home");
  
    return (
      <div>
        <button onClick={goHome}>
          WELCOME!
        </button>
        <img src={img} alt='' />
      </div>
    );
  }