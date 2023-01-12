const { Router } = require('express');
// Importar todos los routers
const recipeRouter = require("./Recipe_router.js")
const dietRouter = require("./Diet_router.js")
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", recipeRouter)
router.use("/diets", dietRouter)

module.exports = router;
