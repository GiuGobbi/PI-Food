const axios = require("axios");
const {Recipe, Diet} = require("../db")
const {API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5} = process.env;
const data = require('./apiData.json');

const getApiRecipes = async () => {
    const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_1}&addRecipeInformation=true&number=100`)
    
    const apiInfo = await res.data.results.map(recipe => {
      return {
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        dishTypes: recipe.dishTypes.map(type => type),
        stepByStep: recipe.analyzedInstructions[0]?.steps.map(step => step.step),
        diets: recipe.diets.map(diet => diet),
        image: recipe.image,
      }
    })
    return apiInfo
};

const getDBRecipes = async () => {
    const dbRecipes = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });

    if (dbRecipes.length > 0) {
        return dbRecipes;
    } else {
        return []
    }
};

const mergeAllRecipes = async () => {
        // const apiRec = await getApiRecipes();
        const dbRec = await getDBRecipes();
        // const allRec = apiRec.concat(dbRec);
        const allRec = data.concat(dbRec);
        return allRec;
};

module.exports= {
    mergeAllRecipes,
    getDBRecipes
}
