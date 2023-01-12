const initialState = {
    allRecipes: [], 
    recipes: [],
    diets: [],
    detail: [],
    //select values home
    filterSelectValue: 'DEFAULT',
    sortSelectValue: 'DEFAULT'
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
    case "GET_RECIPES":
        return {
          ...state,
          recipes: action.payload,
          allRecipes: action.payload,
        };
  
    case "GET_DIETS": 
        return {
          ...state,
          diets: action.payload
        };
  
    case "SEARCH_BY_NAME":
        return {
          ...state,
          recipes: action.payload,
        };

    case "GET_DETAIL":
        return {
          ...state,
          detail: action.payload
        };

    case "FILTER_BY_DIET":
        const filtered = action.payload === 'all' ? state.allRecipes : state.allRecipes.filter(recipe => recipe.diets.includes(action.payload))
        return {
          ...state,
          recipes: filtered
        };
      

    case "SORT_BY_NAME":
        const recipesSortedByName =
        action.payload === 'nameAtoZ' 
        ? state.allRecipes.sort((a, b) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
            })
            : state.allRecipes.sort((a, b) => {
            if (a.name < b.name) return 1
            if (a.name > b.name) return -1
            return 0
            })
        return {
              ...state,
              recipes: recipesSortedByName
            };

    case "SORT_BY_HEALTHSCORE":
      const recipesSortedByHealthScore =
        action.payload === 'lowerHealthScore' 
          ? state.allRecipes.sort((a, b) => {
            if (a.healthScore > b.healthScore) return 1
            if (a.healthScore < b.healthScore) return -1
            return 0
          })
          : state.allRecipes.sort((a, b) => {
            if (a.healthScore < b.healthScore) return 1
            if (a.healthScore > b.healthScore) return -1
            return 0
          })
      return {
        ...state,
        recipes: recipesSortedByHealthScore
      };
    
    default:
        return {...state} ;
    }
}