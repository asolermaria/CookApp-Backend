const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middlewares/authMiddleware");
const { getRecipes, getRecipeById, getMyRecipes, createRecipe, updateRecipe, deleteRecipe } = require("../controllers/recipeController");

router.get("/", authenticateJWT, getRecipes);
router.get("/myrecipes", authenticateJWT, getMyRecipes);
router.get("/:id", authenticateJWT, getRecipeById);
router.post("/", authenticateJWT, createRecipe);
router.put("/:id", authenticateJWT, updateRecipe);
router.delete("/:id", authenticateJWT, deleteRecipe);

module.exports = router;
