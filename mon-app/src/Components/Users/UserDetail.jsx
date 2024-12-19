import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Users.css";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'utilisateur :", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <div className="users-container">Chargement des détails de l'utilisateur...</div>;
  }

  return (
    <div className="users-container">
      <h1>Détails de l'utilisateur</h1>
      <div className="user-detail-card">
        <p><strong>Nom d'utilisateur :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Date de création :</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Dernière mise à jour :</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default UserDetail;
