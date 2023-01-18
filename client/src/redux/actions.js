import axios from "axios"; 


export function getRecipes() {
    return async function (dispatch) {
        const res = await axios.get("http://localhost:3001/recipes")
        dispatch({
          type: "GET_RECIPES",
          payload: res.data
        });
    }
};

export function getDiets() {
    return async function(dispatch) {
        const res = await axios.get("http://localhost:3001/diets")
        dispatch({
            type: "GET_DIETS",
            payload: res.data
          });
    }
};

export function searchByName (name) {
    return async function (dispatch) {
      try {
        const res = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        console.log(res.data)
        dispatch({
          type: "SEARCH_BY_NAME",
          payload: res.data
        })
      } catch (e) {
        dispatch({
          type: "SEARCH_BY_NAME",
          payload: e.response
        })
      }
    }
};

export function filterByDiet (value) {
    return {
      type: "FILTER_BY_DIET",
      payload: value
    }
};
  
export function sortByName (value) {
    return {
      type: "SORT_BY_NAME",
      payload: value
    }
};
  
export function sortByHealthScore (value) {
    return {
      type: "SORT_BY_HEALTHSCORE",
      payload: value
    }
};
  
export function getDetail (id) {
    return async function (dispatch) {
      try {
        const res = await axios.get(`http://localhost:3001/recipes/${id}`)
        dispatch({
          type: "GET_DETAIL",
          payload: res.data
        })
      } catch (e) {
        dispatch({
          type: "GET_DETAIL",
          payload: e.response.data
        })
      }
    }
};
export function postRecipe (newRecipe) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`http://localhost:3001/recipes`, newRecipe)
      alert(res.data)
      dispatch({
        type: 'POST_RECIPE',
        payload: res.config.data
      })
    } catch (e) {
      alert(e)
    }
  }
}

