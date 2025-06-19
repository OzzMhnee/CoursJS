class Monstre {
    constructor(nom, race, pointsDeVie, competences) {
        this.nom = nom;
        this.race = race;
        this.pointsDeVie = pointsDeVie;
        this.pointsDeVieMax = pointsDeVie;
        this.competences = competences;
        this.estVivant = true;
    }
}

// Exemples de monstres
const gobelin = new Monstre("Gobelin", "Gobelin", 40, [
    new Competence("Griffure", 10),
    new Competence("Morsure", 12)
]);
const orc = new Monstre("Orc", "Orc", 60, [
    new Competence("Hache", 18),
    new Competence("Hurlement", 5)
]);
const dragonnet = new Monstre("Dragonnet", "Dragon", 100, [
    new Competence("Souffle de feu", 25),
    new Competence("Coup de queue", 15)
]);

const bestiaire = [gobelin, orc, dragonnet];
