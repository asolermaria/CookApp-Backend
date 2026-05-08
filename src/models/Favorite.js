const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    recipe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Favorite", favoriteSchema);
