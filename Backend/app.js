import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
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
                            "valeur": 4000000,
                            "dateDebut": "2023-12-25T00:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": 5
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Alternance",
                            "valeur": 500000,
                            "dateDebut": "2022-12-31T21:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": null,
                            "jour": 1,
                            "valeurConstante": 500000
                        },
                        {
                            "possesseur": { "nom": "John Doe" },
                            "libelle": "Survie",
                            "valeur": -300000,
                            "dateDebut": "2022-12-31T21:00:00.000Z",
                            "dateFin": null,
                            "tauxAmortissement": null,
                            "jour": 2,
                            "valeurConstante": -300000
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
    // saveData(); // Assurez-vous que cette fonction est définie quelque part

    res.status(201).json(newPossession);
});


app.get('/api/chart-data', (req, res) => {
    const dateFin = new Date(req.query.dateFin);

    const labels = [];
    const values = [];
    
    res.json({labels, values});
});
app.get('/possession',(req,res)=>{
    res.json(patrimoineData.data.possessions);
})
app.get('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    
    // Cherchez la possession correspondante
    const possession = patrimoineData.data.possessions[0].data.possessions.find(p => p.libelle === libelle);
    
    if (possession) {
        res.json(possession); // Renvoie la possession trouvée en JSON
    } else {
        res.status(404).json({ error: 'Possession non trouvée' }); // Renvoie une erreur 404 si non trouvée
    }
});

app.put('/possession/:libelle', (req, res) => {
    const libelle = req.params.libelle;
    const { possesseur, libelle: newLibelle, valeur, dateDebut, dateFin, tauxAmortissement } = req.body;

    let possession = patrimoineData.data.possessions[0].data.possessions.find(p => p.libelle === libelle);
    
    if (possession) {
        // Mettre à jour les valeurs
        possession.possesseur = possesseur;
        possession.libelle = newLibelle;
        possession.valeur = valeur;
        possession.dateDebut = dateDebut;
        possession.dateFin = dateFin;
        possession.tauxAmortissement = tauxAmortissement;

        res.status(200).json(possession); // Renvoie la possession mise à jour en JSON
    } else {
        res.status(404).json({ error: 'Possession non trouvée' }); // Renvoie une erreur 404 si non trouvée
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
