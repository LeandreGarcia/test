const express = require("express");
const app = express();

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

app.post("/blog", (req, res) => {
  // Si le formulaire n'inclut pas de fichier
  if (!req.is("multipart/form-data")) {
    console.log("Données sans fichier:");
    console.log("Auteur:", req.body.author);
    // Ajoutez ici d'autres champs du formulaire si nécessaire
  } else {
    // Si le formulaire inclut un fichier
    console.log("Données avec fichier:");
    console.log("Auteur:", req.body.author);
    // Gérer le fichier
    const file = req.files.image;
    console.log("Nom du fichier:", file.name);
    console.log("Type du fichier:", file.mimetype);
    // Ajoutez ici d'autres champs du formulaire si nécessaire
  }

  // Ajoutez ici le code pour traiter les données du formulaire

  res.send("Données reçues avec succès!");
});

app.listen(3000, () => {
  console.log("Serveur Express écoutant sur le port 3000");
});