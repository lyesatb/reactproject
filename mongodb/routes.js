const express = require("express");
const { registerUser, loginUser, updateUser,deleteUser,getUsers } = require("./Controllers/useController");
const authMiddleware = require("./Middleware/authMiddleware");
const router = express.Router();
const {
    createRecipe,
    getRecipes,
    updateRecipe,
    getRecipeByUserId,
    deleteRecipe,
  } = require("./Controllers/recipeController");
  
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update/:id", authMiddleware, updateUser);
router.delete("/delete", authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers)
router.post("/recipe", authMiddleware, createRecipe);
router.get("/recipes", authMiddleware, getRecipes);
router.put("/recipe/:recipeId", authMiddleware, updateRecipe);
router.get("/recipe/:userId", authMiddleware, getRecipeByUserId);
router.delete("/recipe/:recipeId", authMiddleware, deleteRecipe);
 
module.exports = router;