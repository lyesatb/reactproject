import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Recipes.css";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const token = localStorage.getItem("token");
  const API_URL = "http://localhost:8080/recipes";

  const getRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  const addRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/recipe",
        newRecipe,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecipes([...recipes, response.data]);
      setNewRecipe({ title: "", description: "", category: "", price: "" });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce :", error);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const confirm = window.confirm(
        "Voulez-vous vraiment supprimer cette annonce ?"
      );
      if (!confirm) return;
      await axios.delete(`${"http://localhost:8080/recipe"}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(recipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'annonce :", error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="recipe-container">
      <h1>Liste des annonces</h1>
      <button onClick={getRecipes}>Rafraîchir la liste</button>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-item">
            <h2>{recipe.title}</h2>
            <p>
              <strong>Catégorie:</strong> {recipe.category}
            </p>
            <p>
              <strong>Description:</strong> {recipe.description}
            </p>
            <p>
              <strong>Prix:</strong> {recipe.price} €
            </p>
            <button onClick={() => deleteRecipe(recipe._id)}>Supprimer</button>
          </div>
        ))}
      </div>

      <h1>Ajouter une annonce</h1>
      <form onSubmit={addRecipe} className="recipe-form">
        <input
          type="text"
          placeholder="Titre"
          value={newRecipe.title}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, title: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          value={newRecipe.description}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={newRecipe.category}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Prix"
          value={newRecipe.price}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, price: e.target.value })
          }
        />
        <button type="submit">Ajouter une annonce</button>
      </form>
    </div>
  );
};

export default Recipe;
