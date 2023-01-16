const axios = require("axios");
const {Recipe, Diet} = require("../db")
const {API_KEY} = process.env;
const data = require('./apiData.json');


// `https://api.spoonacular.com/recipes/complexSearch?apiKey=182715630d194268ae644925fdfcbfb1&addRecipeInformation=true&number=100`


// const getApiRecipes = async () => {
//     const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=182715630d194268ae644925fdfcbfb1&addRecipeInformation=true&number=100`)
    
//     const apiInfo = await res.data.results.map(recipe => {
//       return {
//         id: recipe.id,
//         name: recipe.title,
//         summary: recipe.summary,
//         healthScore: recipe.healthScore,
//         dishTypes: recipe.dishTypes.map(type => type),
//         stepByStep: recipe.analyzedInstructions[0]?.steps.map(step => step.step),
//         diets: recipe.diets.map(diet => diet),
//         image: recipe.image,
//       }
//     })
//     return apiInfo
// };

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
        const allRec = data.concat(dbRec);
        return allRec;
};

module.exports= {
    mergeAllRecipes,
    getDBRecipes
}
