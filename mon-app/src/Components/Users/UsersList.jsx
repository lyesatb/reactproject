import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token");

  // Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  // Ajouter un utilisateur
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "" ,password:""});
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    }
  };

  // Modifier un utilisateur
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/update/${editUser._id}`,
        editUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((user) => (user._id === editUser._id ? response.data : user)));
      setEditUser(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (id) => {
    try {
      await axios.delete("http://localhost:8080/delete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h1>Gestion des Utilisateurs</h1>
      <form onSubmit={editUser ? updateUser : addUser} className="user-form">
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={editUser ? editUser.name : newUser.name}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, name: e.target.value })
              : setNewUser({ ...newUser, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={editUser ? editUser.email : newUser.email}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
        />
                <input
          type="password"
          placeholder="password"
          value={editUser ? editUser.password : newUser.password}
          onChange={(e) =>
            editUser
              ? setEditUser({ ...editUser, password: e.target.value })
              : setNewUser({ ...newUser, password: e.target.value })
          }
        />


        <button type="submit">{editUser ? "Modifier" : "Ajouter"}</button>
        {editUser && <button onClick={() => setEditUser(null)}>Annuler</button>}
      </form>
      <div className="users-list">
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <p><strong>Nom :</strong> {user.name}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <button onClick={() => setEditUser(user)}>Modifier</button>
            <button onClick={() => deleteUser(user._id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
