import axios, { AxiosHeaders } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css'; // Assurez-vous d'importer le fichier CSS

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    axios
      .post("http://localhost:8080/register", {
        email: email,
        password: password,
        name: username,
      })
      .then((response) => {
        alert("Compte créé avec succès");
        navigate("/login");
      })
      .catch((error) => {
        alert("Erreur lors de la création du compte");
      });
  };

  return (
    <div className="register-container"> {/* Applique la classe CSS ici */}
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
