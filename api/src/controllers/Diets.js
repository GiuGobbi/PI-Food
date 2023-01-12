const {Diet} = require("../db");
const {getApiRecipes} = require("./Recipes.js")

const getAllDiets = async () => {
    const apiRec = await getApiRecipes();

    const allDiets = apiRec.map(recipe => recipe.diets)
    //array of arrays
    
    const arrayDiets = allDiets.flat()
    //queda un array sin otros adentro

    //creo Set para sacar dietas que se repiten 
    const arrayDietsFinal = [
        ...new Set(arrayDiets), 'vegetarian',
        'lacto vegetarian',
        'ovo vegetarian'];   //PORQUEEEEE??? 

    arrayDietsFinal.forEach(async (diet) => {
        await Diet.findOrCreate({
            where: { name: diet },
        });
    })

    console.log(arrayDietsFinal)
    let allDBDiets = await Diet.findAll()

    return allDBDiets.map(diet => diet.name)
};

module.exports = getAllDiets