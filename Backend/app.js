import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        "https://patrimoine-economique-1-om67.onrender.com",
        "https://patrimoine-economique-ux65.onrender.com",
    ],
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type", "Authorization"],
    
    })
);
app.use(express.json());

const patrimoineData = {
    model: 'Patrimoine',
    data: {
        possessions: [
            {
                "model": "Patrimoine",
                "data": {
                    "possesseur": { "nom": "John Doe" },
                    "possessions": [
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "MacBook Pro",
                            "valeur": 4300000,
                            "dateDebut": "2023-12-25T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 5
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Compte épargne",
                            "valeur": 500000,
                            "dateDebut": "2019-01-06T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": -5
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Clothes",
                            "valeur": 2000000,
                            "dateDebut": "2020-01-01T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 10
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Alternance",
                            "valeur": 600000,
                            "dateDebut": "2023-02-13T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 0,
                            "jour": 1,
                            "valeurConstante": 600000
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Survie",
                            "valeur": 300000,
                            "dateDebut": "2023-02-13T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 0,
                            "jour": 2,
                            "valeurConstante": -300000
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Redmi Note 9",
                            "valeur": 800000,
                            "dateDebut": "2022-12-29T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 15
                        }
                    ]
                }
            }
        ]
    }
};

app.get('/api/patrimoine', (req, res) => {
    res.json(patrimoineData);
});

app.post('/possession/create', (req, res) => {
    const patrimoine = patrimoineData.data.possessions[0];
    if (!patrimoine || !patrimoine.data || !patrimoine.data.possessions) {
        return res.status(404).json({ message: 'Patrimoine non trouvé' });
    }

    const newPossession = req.body;
    patrimoine.data.possessions.push(newPossession);

    res.status(201).json(newPossession);
});



app.get('/possession', (req, res) => {
    res.json(patrimoineData.data.possessions);
});

app.get('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const possession = patrimoineData.data.possessions[0].data.possessions.find(p => p.libelle === libelle);
    if (possession) {
        res.json(possession);
    } else {
        res.status(404).json({ error: 'Possession non trouvée' });
    }
});

app.put('/possession/:libelle/close', (req, res) => {
    const libelle = req.params.libelle;
    const possession = patrimoineData.data.possessions[0].data.possessions.find(p => p.libelle === libelle);

    if (possession) {
        possession.dateFin = new Date();
        res.status(200).json(possession);
    } else {
        res.status(404).json({ error: 'Possession non trouvée' });
    }
});

app.delete('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const index = patrimoineData.data.possessions[0].data.possessions.findIndex(p => p.libelle === libelle);

    if (index !== -1) {
        patrimoineData.data.possessions[0].data.possessions.splice(index, 1);
        res.status(200).json({ message: 'Possession supprimée avec succès' });
    } else {
        res.status(404).json({ error: 'Possession non trouvée' });
    }
});

app.put('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const { possesseur, libelle: newLibelle, valeur, dateDebut, dateFin, tauxAmortissement } = req.body;

    let possession = patrimoineData.data.possessions[0].data.possessions.find(p => p.libelle === libelle);

    if (possession) {
        possession.possesseur = possesseur;
        possession.libelle = newLibelle;
        possession.valeur = valeur;
        possession.dateDebut = dateDebut;
        possession.dateFin = dateFin;
        possession.tauxAmortissement = tauxAmortissement;

        res.status(200).json(possession);
    } else {
        res.status(404).json({ error: 'Possession non trouvée' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
