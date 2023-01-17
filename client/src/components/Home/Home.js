import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getRecipes} from "../../redux/actions.js";
import Nav from "../Nav/Nav.js";
import FilterDiet from "../FilterDiet/FilterDiet";
import SortRecipes from "../Sort/Sort.js";
import Pagination from "../Pagination/Pagination.js"
import Recipes from "../Recipes/Recipes.js";
import CreateButton from "../CreateButton/CreateButton.js"
import styles from "./home.module.css"
import image from "../../logo.png"


export default function Home() {
  
  const allRecipes = useSelector(state => state.recipes);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  

  useEffect(() => {
      dispatch(getRecipes())
  }, [dispatch])

  const indexOfLastRec = currentPage * recipesPerPage;
  const indexOfFirstRec = indexOfLastRec - recipesPerPage;
  const recipesShown = allRecipes.slice(indexOfFirstRec, indexOfLastRec) 
 
  //acomodar Pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber) 
  }

  const handleRefresh = (e) => {
    e.preventDefault()
    dispatch(setCurrentPage(1))
    dispatch(getRecipes())
  }
  
    return (
      <div>
        <div className={styles.encabezado}>
          <div className={styles.searchDiv}>
            <Nav/>
            <br/>
            <CreateButton/>
            <button className={styles.refresh} onClick={handleRefresh}>Refresh page</button>
          </div>
          <img className={styles.imagen} src={image} alt=""/>
          <h1 className={styles.tituloMain}>Find your favorite recipes</h1>
          <div className={styles.filtersDiv}>
            <FilterDiet/>
            <SortRecipes setCurrentPage={setCurrentPage}/>
          </div>
        </div>
        <br/>
        <div>
          <Recipes recipes={recipesShown}/>
        </div>
        <Pagination recipes={allRecipes.length} reciperPerPage={recipesPerPage} paginate={paginate}/>
      </div>
    )    
};

