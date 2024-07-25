class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur  = possesseur;
    this.date = date
    this.possessions = possessions; 
  }
  getValeur(date) {
    return this.possessions.reduce((total, possession) => total + possession.getValeur(date), 0)
  }
  addPossession(possession) {
    this.possessions.push(possession);
  }
  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }
}

module.exports = Patrimoine;