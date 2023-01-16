const {Diet} = require("../db");
const {getApiRecipes} = require("./Recipes.js")
const data = require('./apiData.json');


const getAllDiets = async () => {
    const apiRec = data

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
    let allDBDiets = await Diet.findAll()
    return allDBDiets
};

module.exports = getAllDiets