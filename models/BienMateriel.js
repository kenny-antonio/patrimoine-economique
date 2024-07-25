class BienMateriel extends Possession {
    constructor(possesseur, libelle, valeurInitiale, dateAchat, tauxDepreciationAnnuel) {
      super(possesseur, "bien_materiel", libelle);
      this.valeurInitiale = valeurInitiale;
      this.dateAchat = new Date(dateAchat);
      this.tauxDepreciationAnnuel = tauxDepreciationAnnuel;
    }
  
    getValeur(date) {
      const dateActuelle = new Date(date);
      const anneesEcoules = dateActuelle.getFullYear() - dateAchat.getFullYear();
      let valeurActuelle = valeurInitiale;
        for (let i = 0; i < anneesEcoules; i++) {
            valeurActuelle *= (1 - tauxDepreciationAnnuel);
        }
    }   

}
module.exports = BienMateriel;