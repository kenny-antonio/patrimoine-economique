import { Router } from 'express';
const router = Router();

// Get Possession list
router.get('/', (req, res) => {
  res.send('Liste des possessions');
});

// Create Possession
router.post('/', (req, res) => {
  res.send('Possession créée');
});

// Update Possession by libelle
router.put('/:libelle', (req, res) => {
  res.send(`Possession ${req.params.libelle} mise à jour`);
});

// Close Possession
router.put('/:libelle/close', (req, res) => {
  res.send(`Possession ${req.params.libelle} fermée`);
});

export default router;
