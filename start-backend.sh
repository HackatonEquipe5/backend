#!/bin/bash

# Vérifier si MongoDB est accessible
echo "Vérification de la connexion à MongoDB..."

# Installer les dépendances
echo "Installation des dépendances backend..."
npm install

# Démarrer le backend
echo "Démarrage du serveur backend..."
npm run dev

