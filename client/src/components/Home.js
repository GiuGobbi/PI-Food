import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getRecipes, getDiets} from "../redux/actions.js";
import Nav from "./Nav.js";
import FilterDiet from "./FilterDiet.js";
import Sort from "./Sort.js";
import RecipeCard from "./RecipeCard.js";


export default function Home() {
  
  const allRecipes = useSelector(state => state.recipes);
  const allDiets = useSelector(state => state.diets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allRecipes.length) {
      dispatch(getRecipes())
      dispatch(getDiets())
    }
  }, [dispatch])

  console.log(allRecipes[2])
    return (
      <div>
        <Nav/>
        <FilterDiet/>
        <div>
          {allRecipes.map(recipe => 
            <RecipeCard
            key={recipe.id}
            name={recipe.name}
            image={recipe.image}
            diets={recipe.diets}
            />
          )}
        </div>
      </div>
    )    
};

// Nav + search button
// Options button - Diet
// Options button - Alfabetic Order or HS
// Div donde renderizar Lista de Recetas (9 recipes)
// previous page - next page 
