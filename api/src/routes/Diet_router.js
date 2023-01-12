const Router = require("express");
const getAllDiets = require("../controllers/Diets.js");
const {Recipe, Diet} = require("../db.js");

const router = Router()

router.get("/", async (req, res) => {
    const allDiets = await getAllDiets();
    
    if (allDiets.length > 0) {
        res.status(200).json(allDiets)
    } else {
        res.status(404).send("404 - Something went wrong")
    }
});

module.exports = router