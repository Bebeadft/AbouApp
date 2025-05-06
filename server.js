require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Configuration de la base de données MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Mets ton utilisateur MySQL
    password: "", // Mets ton mot de passe
    database: "abou_bases"
});
 
db.connect(err => {
    if (err) {
        console.error("Erreur de connexion MySQL:", err);
    } else {
        console.log("Connecté à MySQL ✅");
    }
});

// Route pour tester la connexion


// Route pour enregistrer une action dans la base
app.post("/day", (req, res) => {
    const { calendars, status } = req.body;

    if (!calendars) {
        return res.status(400).json({ message: "selectonne une date" });
    }

    const sql = "INSERT INTO day (date_selectionnes, status) VALUES (?, ?)";
    db.query(sql, [calendars, status], (err, result) => {
        if (err) {
            console.error("Erreur d'insertion :", err);
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }
        res.status(201).json({ message: "Day ajouté avec succès" });
    });
});

app.get("/clean-day", (req, res) => {
    const sql = "SELECT COUNT(*) AS total_clean_day FROM day WHERE status = 'clean'";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de day :", err);
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.json(result[0]);  
    });
});

app.get("/list", (req, res) => {
    const sql = "SELECT * FROM day";

    db.query(sql, (err, result) => {
        if (err) {
            console.error("Erreur lors de la récupération de day :", err);
            return res.status(500).json({ message: "Erreur serveur", error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.json(result);  
    });
});
// Lancer le serveur sur le port 5000
app.listen(5000, () => {
    console.log("Serveur backend démarré");
});
