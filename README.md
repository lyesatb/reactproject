#DZIRI Rayane
#AIT TAYEB Lyes

# Projet : Mon App

## Description
"Mon App" est une application web moderne avec une architecture complète **Frontend + Backend**. 
- **Frontend** : Développé en **React**, il offre une interface utilisateur interactive.
- **Backend** : Basé sur **Node.js** et **MongoDB**, il fournit une API REST robuste pour gérer les utilisateurs et les recettes.

## Fonctionnalités
### Frontend (`mon-app`)
- Pages dynamiques :
  - Accueil
  - Connexion
  - Inscription
  - Liste et gestion des annonces 
  - Gestion des utilisateurs
- Styles personnalisés pour chaque composant.

### Backend (`mongodb`)
- API REST sécurisée pour gérer :
  - Les utilisateurs (création, mise à jour, suppression)
  - Les recettes (création, mise à jour, suppression)
- Middleware d'authentification pour protéger les routes sensibles.
- Modèles de données avec **MongoDB**.

---

<img src="/images/home.png" alt="Image de la page d'accueil" />


<img src="/images/login.png" alt="Image de la page de connexion" />


<img src="/images/register.png" alt="Image de la page d'enregistrement" />

<img src="/images/liste.png" alt="Image de la liste des annonces" />

<img src="/images/ajouter.png" alt="Image de la page pour ajouter une annonces" />



## Structure du Projet
```bash
projet/
├── mon-app/                # Frontend React
│   ├── src/                # Code source React
│   │   ├── Components/     # Composants React (Home, Login, Recipes, etc.)
│   │   ├── App.js          # Composant principal
│   │   ├── index.js        # Point d'entrée React
│   └── public/             # Fichiers publics (favicon, index.html)
├── mongodb/                # Backend Node.js
│   ├── Controllers/        # Contrôleurs pour les recettes et utilisateurs
│   ├── Middleware/         # Middleware d'authentification
│   ├── Models/             # Modèles de données MongoDB
│   ├── routes.js           # Définition des routes API
│   ├── app.js              # Point d'entrée du serveur Node.js
│   └── .env                # Variables d'environnement


