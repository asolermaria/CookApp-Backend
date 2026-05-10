const Favorite = require("../models/Favorite");
const Recipe = require("../models/Recipe");

// GET
// http://localhost:3000/api/favorites
const getFavorites = async (req, res) => {
  const favorites = await Favorite.find({
    user_id: req.user.id,
  }).populate({
    path: "recipe_id", // Populate completo de recipe_id
    populate: { // Populate de name y email del campo user_id (creador de recipe_id)
      path: "user_id",
      select: "name email",
    },
  });

  res.status(200).json(favorites);
};

// POST
// http://localhost:3000/api/favorites/(recipeId)
const addFavorite = async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);

  if (!recipe) {
    return res.status(404).json({
      message: "Receta no encontrada",
    });
  }

  const favoriteExists = await Favorite.findOne({
    user_id: req.user.id,
    recipe_id: req.params.recipeId,
  });

  if (favoriteExists) {
    return res.status(409).json({
      message: "La receta ya está en favoritos",
    });
  }

  const favorite = await Favorite.create({
    user_id: req.user.id,
    recipe_id: req.params.recipeId,
  });

  res.status(201).json(favorite);
};

const removeFavorite = async (req, res) => {
  const favorite = await Favorite.findOne({
    user_id: req.user.id,
    recipe_id: req.params.recipeId,
  });

  if (!favorite) {
    return res.status(404).json({
      message: "Favorito no encontrado",
    });
  }

  await favorite.deleteOne();

  res.status(200).json({
    message: "Favorito eliminado",
  });
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};