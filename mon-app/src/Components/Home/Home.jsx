import axios from "axios";
import React, { useEffect, useState } from "react";
import './Home.css'; // Assurez-vous d'importer le fichier CSS

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/recipes", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setRecipes(response.data);
      });
  }, []);

  return (
    <div className="home-container"> {/* Applique la classe CSS ici */}
      <h1>Liste des annonces</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <p>{recipe.title}</p>
            <p>{recipe.cuisineType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
