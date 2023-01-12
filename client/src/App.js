import './App.css';
import React from 'react';
//import { useState } from 'react';
//import Cards from './components/Cards/Cards.jsx';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home.js";
import RecipeCard from "./components/RecipeCard.js"
import LandingPage from './components/LandingPage.js';
//import { Favorites } from './components.Favorites';
import {BrowserRouter} from "react-router-dom"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<Home/>}/> 
      <Route path="/home/:id" element={<RecipeCard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;
