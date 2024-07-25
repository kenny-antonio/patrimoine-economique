const Possession = require("./Possession");
class Argent extends Possession {
  constructor(possesseur, libelle, montant = 0, dateCreation = null, salaireMensuel = 0, trainDeVieMensuel = 0, dateDepot = null, tauxAnnuel = 0) {
    super(possesseur, "argent", libelle);
    this.montant = montant;
    this.dateCreation = dateCreation ? new Date(dateCreation) : null;
    this.salaireMensuel = salaireMensuel;
    this.trainDeVieMensuel = trainDeVieMensuel;
    this.dateDepot = dateDepot ? new Date(dateDepot) : null;
    this.tauxAnnuel = tauxAnnuel;
  }

  getValeur(date) {
    const dateActuelle = new Date(date);

    switch (this.libelle) {
      case 'especes': {
        return this.montant;
      }
      case 'compte_courant': {
        const moisEcoules = (dateActuelle.getFullYear() - this.dateCreation.getFullYear()) * 12 + (dateActuelle.getMonth() - this.dateCreation.getMonth());
        let valeurActuelle = this.montant;

        for (let i = 0; i < moisEcoules; i++) {
          valeurActuelle += (this.salaireMensuel - this.trainDeVieMensuel);
        }

        return valeurActuelle;
      }
      case 'compte_epargne': {
        const moisEcoules = (dateActuelle.getFullYear() - this.dateDepot.getFullYear()) * 12 + (dateActuelle.getMonth() - this.dateDepot.getMonth());
        let valeurActuelle = this.montant;
        const tauxInteretMensuel = this.tauxAnnuel / 12 / 100;

        for (let i = 0; i < moisEcoules; i++) {
          valeurActuelle *= (1 + tauxInteretMensuel);
        }

        return valeurActuelle;
      }
      default:
        return 0;
    }
  }
}


module.exports = Argent;