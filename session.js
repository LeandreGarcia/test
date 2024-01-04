import express from "express";
import session from "express-session";

const app = express();

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));

// Middleware pour configurer la session dans Express
app.use(
    session({
        secret: "aYF8ISbYkXvzsrA4LVvRj6LQo5gLBqUX",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
        },
        rolling: true,
    })
);

// Middleware pour rendre des données de sessions disponibles sur toutes les routes
app.use((req, res, next) => {
    if(req.session?.name){
        res.locals.session = req.session.name;
    }
    console.log(res.locals);
    console.log("---------------------");
    next();
});

// Route pour afficher la session
app.get("/", (req, res) => {
    res.send(res.locals.session?.name ? res.locals.session.name : "no session");
});

// Route pour gérer les données du formulaire
app.post("/blog", (req, res) => {
    if (!req.is("multipart/form-data")) {
        console.log("Données sans fichier:");
        console.log("Auteur:", req.body.author);
        // Ajoutez ici d'autres champs du formulaire si nécessaire
    } else {
        console.log("Données avec fichier:");
        console.log("Auteur:", req.body.author);
        const file = req.files.image;
        console.log("Nom du fichier:", file.name);
        console.log("Type du fichier:", file.mimetype);
    }

    // Ajoutez ici le code pour traiter les données du formulaire

    res.send("Données reçues avec succès!");
});

// Route pour définir la session
app.get("/login", (req, res) => {
    req.session.name = "John";
    res.send("session set");
});

// Route pour détruire la session
app.get("/logout", (req, res) => {   
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.send("session destroyed");
});

app.listen(3000, () => {
    console.log("Serveur Express écoutant sur le port 3000");
});