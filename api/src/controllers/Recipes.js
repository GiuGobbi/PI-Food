const axios = require("axios");
const {Recipe, Diet} = require("../db")
const {API_KEY} = process.env;

const getApiRecipes = async () => {
    const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    
    const apiInfo = await res.data.results.map(recipe => {
      return {
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
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

    if (dbRecipes[0]) {
        return dbRecipes;
    } else {
        return []
    }
};

const mergeAllRecipes = async () => {
        const apiRec = await getApiRecipes();
        const dbRec = await getDBRecipes();
        const allRec = apiRec.concat(dbRec);
        return allRec;
};

module.exports= {
    getApiRecipes,
    mergeAllRecipes,
    getDBRecipes
}
