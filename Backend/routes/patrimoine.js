import { Router } from 'express';
const router = Router();

// Get Valeur Patrimoine by Date
router.get('/:date', (req, res) => {
  res.send(`Valeur du patrimoine pour la date ${req.params.date}`);
});

// Get Valeur Patrimoine Range
router.post('/range', (req, res) => {
  res.send('Valeur du patrimoine sur une plage de dates');
});

export default router;
