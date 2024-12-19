const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../Models/useModel");
 
dotenv.config();
 
// Fonction d'inscription (Register)
const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.password) {
      return res.status(400).send({ error: "Password is required" });
    }
 
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
 
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
 
    await user.save();
 
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
 
// Fonction de connexion (Login)
const loginUser = async (req, res) => {
  try {
    // Recherche de l'utilisateur par email
    const user = await User.findOne({ email: req.body.email });
 
    if (!user) {
      return res.status(404).send("Utilisateur introuvable");
    }
 
    // Comparaison des mots de passe (bcrypt)
    const isMatch = await bcrypt.compare(req.body.password, user.password);
 
    if (!isMatch) {
      return res.status(400).send("Mot de passe incorrect");
    }
 
    // Création du token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload (les données à transporter)
      process.env.JWT_SECRET, // Clé secrète pour signer le token
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Durée de validité du token
    );
 
    res.status(200).send({ message: "Connecté avec succès", token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select("-password");
      if (!user) {
        return res.status(404).send({ error: "Utilisateur introuvable" });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.id);
      if (!user) {
        return res.status(404).send({ error: "Utilisateur introuvable" });
      }
      res.status(200).send({ message: "Utilisateur supprimé" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  const getUsers = async (req, res) => {
    try {
      const filter = {};
  
      if (req.query.name) {
        filter.name = { $regex: req.query.name, $options: "i" };
      }
  
      const users = await User.find(filter).select("-password");
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  
module.exports = { registerUser, loginUser, updateUser, deleteUser,getUsers };