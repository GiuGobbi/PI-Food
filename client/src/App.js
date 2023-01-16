import './App.css';
import React from 'react';
//import { useState } from 'react';
//import Cards from './components/Cards/Cards.jsx';
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home.js";
import LandingPage from './components/LandingPage.js';
import {BrowserRouter} from "react-router-dom"
import Detail from "./components/Detail.js"
import CreateRecipe from "./components/CreateRecipe/CreateRecipe.js"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/home" element={<Home/>}/> 
      <Route path="/home/:id" element={<Detail/>}/>
      <Route path="/create" element={<CreateRecipe/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
};


export default App;
