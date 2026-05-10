const Recipe = require("../models/Recipe");

// GET
// http://localhost:3000/api/recipes/all ?title=tor&difficulty=Media
const getRecipes = async (req, res) => {
  const { title, difficulty } = req.query;

  const filters = {};

  if (difficulty) {
    filters.difficulty = difficulty;
  }

  if (title) {
    filters.title = {
      $regex: title, // Búsqueda parcial del título
      $options: "i", // Ignora mayúsculas y minúsculas
    };
  }

  const recipes = await Recipe.find(filters).populate("user_id", "name email"); // Traemos el nombre y email del usuario creador de la receta

  res.status(200).json(recipes);
};

// GET
// http://localhost:3000/api/recipes/(id)
const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate(
    "user_id",
    "name email",
  );

  if (!recipe) {
    return res.status(404).json({
      message: "Receta no encontrada",
    });
  }

  res.status(200).json(recipe);
};

// GET
// http://localhost:3000/api/recipes/myrecipes
const getMyRecipes = async (req, res) => {
  const recipes = await Recipe.find({ user_id: req.user.id });

  res.status(200).json(recipes);
};

// POST
// http://localhost:3000/api/recipes/
const createRecipe = async (req, res) => {
  const { title, image, ingredients, steps, difficulty } = req.body;

  // Validación datos de entrada
  if (!title || !image || !ingredients || !steps || !difficulty) {
    return res.status(400).json({
      message:
        "Faltan datos obligatorios: { title, image, ingredients, steps, difficulty }",
    });
  }

  const recipe = await Recipe.create({
    user_id: req.user.id,
    title,
    image,
    ingredients,
    steps,
    difficulty,
  });

  res.status(201).json(recipe);
};

// PUT
// http://localhost:3000/api/recipes/(id)
const updateRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: "Receta no encontrada" });
  }

  if (recipe.user_id.toString() !== req.user.id) { // recipe.user_id en MongoDB se guarda como ObjectId y el user.id en JWT como String, por eso la conversión
    return res.status(403).json({ message: "No puedes editar esta receta" });
  }

  const { title, image, ingredients, steps, difficulty } = req.body;

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    { title, image, ingredients, steps, difficulty },
    { new: true, runValidators: true },
  );

  res.status(200).json(updatedRecipe);
};

// DELETE
// http://localhost:3000/api/recipes/(id)
const deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: "Receta no encontrada" });
  }

  if (recipe.user_id.toString() !== req.user.id) {
    return res.status(403).json({ message: "No puedes eliminar esta receta" });
  }

  await recipe.deleteOne();

  res.status(200).json({ message: "Receta eliminada correctamente" });
};

module.exports = {
  getRecipes,
  getRecipeById,
  getMyRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
