const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    ingredients: {
      type: [String],
      required: true,
    },
    steps: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Baja", "Media", "Alta"],
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Recipe", recipeSchema);
