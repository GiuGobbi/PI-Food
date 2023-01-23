const initialState = {
    allRecipes: [], 
    recipes: [],
    diets: [],
    detail: [],
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
          recipes: [...filtered]
        };

    case "SORT_BY_NAME":
        const copyAZ = [...state.recipes]
        const recipesSortedByName =
        action.payload === 'order A to Z' 
        ? copyAZ.sort((a, b) => {
            if (a.name > b.name) return 1
            if (a.name < b.name) return -1
            return 0
            })
            : copyAZ.sort((a, b) => {
            if (a.name < b.name) return 1
            if (a.name > b.name) return -1
            return 0
            })
        return {
              ...state,
              recipes: action.payload === 'all' ? state.allRecipes : recipesSortedByName
            };

    case "SORT_BY_HEALTHSCORE":
      const copy = [...state.recipes];
      const recipesSortedByHealthScore =
        action.payload === 'lowerHealthScore' 
          ? copy.sort((a, b) => {
            if (a.healthScore > b.healthScore) return 1
            if (a.healthScore < b.healthScore) return -1
            return 0
          })
          : copy.sort((a, b) => {
            if (a.healthScore < b.healthScore) return 1
            if (a.healthScore > b.healthScore) return -1
            return 0
          })
      return {
        ...state,
        recipes: action.payload === 'all' ? state.allRecipes : recipesSortedByHealthScore
      };
      
      case "POST_RECIPE":
        const newRec = action.payload; 
        const allRecipes = [...state.allRecipes];
        allRecipes.push(newRec)
        return {
          ...state,
          recipes: [...allRecipes],
          allRecipes: [...allRecipes],
        };

    default:
        return {...state} ;
    }
}