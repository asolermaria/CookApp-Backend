const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middlewares/authMiddleware");
const { getFavorites, addFavorite, removeFavorite } = require("../controllers/favoriteController");

router.get("/", authenticateJWT, getFavorites);
router.post("/:recipeId", authenticateJWT, addFavorite);
router.delete("/:recipeId", authenticateJWT, removeFavorite);


module.exports = router;
