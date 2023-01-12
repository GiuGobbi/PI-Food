const Router = require("express");
const { getApiRecipes, mergeAllRecipes, getDBRecipes} = require("../controllers/Recipes.js");
const {Recipe, Diet} = require("../db.js");

const router = Router()

router.get("/", async(req, res) => {
    const {name} = req.query;
    let allRecipes = await mergeAllRecipes();

    if (name) {
        const results = allRecipes.filter(rec => rec.name.toLowerCase().includes(name.toLowerCase()));
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).send("404 - Recipe not found");
        }
    } else {
        res.status(200).json(allRecipes);
    }
});
  

router.get("/:id", async(req, res) => {
    try {
        const id = req.params.id
        const allInfo = await mergeAllRecipes()
        const recipeDetail = allInfo.find(recipe => recipe.id === id)

        if (recipeDetail) {
            res.status(200).send(recipeDetail)
        } else {
            res.status(404).send('Recipe not found')
        }
      } catch (err) {
        console.log("Error:" + err)
        res.status(400).send('Something went wrong')
      }
});

router.post("/", async(req, res) => {
    const {name, summary, healthScore, stepByStep, diets} = req.body;

        if (name && summary) {
            var newRecipe = await Recipe.create({
                name: name,
                summary: summary,
                stepByStep: stepByStep? stepByStep : null,
                healthScore: healthScore, 
            });
        
         if (diets.length !== 0) {
            const allDiets = await Diet.findAll({
                where: {
                  name: diets
                }
              })
              newRecipe.addDiet(allDiets)
            }
            res.status(200).json("Your recipe has been created! :)");
        } else {
            res.status(402).send("Insert valid parameters");
        }
});

module.exports = router