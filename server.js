const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// === STOCKAGE DES DONNÉES EN MÉMOIRE (simple pour commencer) ===
let jalons = [];

// === GET : récupérer tous les jalons ===
app.get("/jalons", (req, res) => {
    res.json(jalons);
});

// === POST : ajouter un jalon ===
app.post("/jalons", (req, res) => {
    const newJalon = req.body;
    jalons.push(newJalon);
    res.json({ message: "Jalon ajouté", jalon: newJalon });
});

// === PUT : mettre à jour un jalon ===
app.put("/jalons/:id", (req, res) => {
    const id = Number(req.params.id);
    const updated = req.body;

    const index = jalons.findIndex(j => j.id === id);
    if (index === -1) return res.status(404).json({ error: "Non trouvé" });

    jalons[index] = updated;
    res.json({ message: "Jalon mis à jour", jalon: updated });
});

app.listen(3000, () => console.log("Backend en marche sur port 3000"));