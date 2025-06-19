class Competence {
    constructor(nom, degats, soin = 0, type = "attaque") {
        this.nom = nom;
        this.degats = degats;
        this.soin = soin;
        this.type = type;
    }
}

class Personnage {
    constructor(nom, race, classe, pointsDeVie, competences, potions = 2) {
        this.nom = nom;
        this.race = race;
        this.classe = classe;
        this.pointsDeVie = pointsDeVie;
        this.pointsDeVieMax = pointsDeVie;
        this.competences = competences;
        this.sac = [];
        this.potions = potions;
        this.estVivant = true;
    }

    utiliserPotion() {
        if (this.potions > 0 && this.estVivant) {
            this.pointsDeVie = Math.min(this.pointsDeVie + 30, this.pointsDeVieMax);
            this.potions--;
            return true;
        }
        return false;
    }
}

// Compétences
const competenceFeu = new Competence("Boule de Feu", 30);
const competenceChant = new Competence("Chant magique", 15);
function competenceSoinRandom() {
    return new Competence("Chant de Vie", 0, randomInt(-15, 15), "soin");
}

// Personnages

const wrandrall = new Personnage("Wrandrall", "Humain croisé démon", "Guerrier", 100, [
    new Competence("Coup d'épée", 20),
    new Competence("Esquive", 0)
]);
const zarakai = new Personnage("Zarakaï", "Nain", "Guerrier", 120, [
    new Competence("Coup de marteau", 25),
    new Competence("Charge", 15)
]);
const enoriel = new Personnage("Enoriel", "Elfe", "Barde", 90, [
    competenceChant,
    competenceSoinRandom()
]);
const zehirmahnn = new Personnage("Zehirmahnn", "Zorlim", "Mage du feu", 110, [
    competenceFeu,
    new Competence("Bouclier de Flammes", 0)
]);
const guertrude = new Personnage("Guertrude", "Humaine", "Guerrière", 80, [
    new Competence("Coup de hache", 18),
    new Competence("Cri de guerre", 0)
]);
const trichelieu = new Personnage("Trichelieu", "Elfe noir", "Assassin", 70, [
    new Competence("Coup de dague", 22),
    new Competence("Furtivité", 0)
]);
const personnagesDisponibles = [wrandrall, zarakai, enoriel, zehirmahnn, guertrude];
