let joueurActif = 0;
let nombreDeJoueurs = 1;
let joueurs = [];
let monstreActuel = null;

function lancerCombat() {
    document.getElementById('game-area').innerHTML = '';
    monstreActuel = Object.assign(Object.create(Object.getPrototypeOf(bestiaire[randomInt(0, bestiaire.length-1)])), bestiaire[randomInt(0, bestiaire.length-1)]);
    afficherMessage(`<b>Un ${monstreActuel.nom} apparaît !</b>`, "combat-area", false);
    afficherChoixCombat();
}

function afficherChoixCombat() {
    const joueur = joueurs[joueurActif];
    let html = `<h3>${joueur.nom}, à vous de jouer !</h3>`;
    joueur.personnages.forEach((p, idx) => {
        if (!p.estVivant) {
            html += `<div class="personnage dead">${p.nom} est mort.</div>`;
            return;
        }
        html += `<div class="personnage"><b>${p.nom}</b> (${p.pointsDeVie} PV, ${p.potions} potions)
        <br>Compétences : `;
        p.competences.forEach((c, i) => {
            html += `<button class="bouton" onclick="actionCombat(${idx}, ${i})">${c.nom}</button>`;
        });
        html += `<button class="bouton" onclick="utiliserPotionCombat(${idx})">Utiliser potion</button>`;
        html += `</div>`;
    });
    html += `<button class="bouton" onclick="fuirCombat()">Fuir</button>`;
    document.getElementById('combat-area').innerHTML = html;
    afficherInventaire(joueur);
}

function actionCombat(idxPerso, idxComp) {
    const joueur = joueurs[joueurActif];
    const perso = joueur.personnages[idxPerso];
    const comp = perso.competences[idxComp];

    if (!perso.estVivant) return;

    if (comp.type === "soin") {
        const soin = randomInt(-15, 15);
        perso.pointsDeVie = Math.min(perso.pointsDeVie + soin, perso.pointsDeVieMax);
        afficherMessage(`${perso.nom} utilise ${comp.nom} et récupère ${soin} PV !`, "combat-area");
    } else {
        monstreActuel.pointsDeVie -= comp.degats;
        afficherMessage(`${perso.nom} attaque ${monstreActuel.nom} avec ${comp.nom} et inflige ${comp.degats} dégâts !`, "combat-area");
    }

    if (monstreActuel.pointsDeVie <= 0) {
        victoireCombat();
        return;
    }
    tourMonstre();
}

function utiliserPotionCombat(idxPerso) {
    const joueur = joueurs[joueurActif];
    const perso = joueur.personnages[idxPerso];
    if (perso.utiliserPotion()) {
        afficherMessage(`${perso.nom} boit une potion et récupère 30 PV !`, "combat-area");
    } else {
        afficherMessage(`${perso.nom} n'a plus de potion !`, "combat-area");
    }
    tourMonstre();
}

function tourMonstre() {
    setTimeout(() => {
        let c = monstreActuel.competences[randomInt(0, monstreActuel.competences.length-1)];
        // Choisir une cible vivante aléatoire
        let cibles = [];
        joueurs.forEach(j => cibles = cibles.concat(j.personnages.filter(p => p.estVivant)));
        if (cibles.length === 0) {
            afficherMessage("Tous les héros sont morts ! GAME OVER.", "combat-area");
            return;
        }
        let cible = cibles[randomInt(0, cibles.length-1)];
        cible.pointsDeVie -= c.degats;
        afficherMessage(`${monstreActuel.nom} attaque ${cible.nom} avec ${c.nom} et inflige ${c.degats} dégâts !`, "combat-area");
        if (cible.pointsDeVie <= 0) {
            cible.estVivant = false;
            afficherMessage(`${cible.nom} est mort !`, "combat-area");
        }
        if (joueurs.flatMap(j => j.personnages).every(p => !p.estVivant)) {
            afficherMessage("Tous les héros sont morts ! GAME OVER.", "combat-area");
            return;
        }
        passerTour();
    }, 1000);
}

function passerTour() {
    joueurActif = (joueurActif + 1) % nombreDeJoueurs;
    afficherChoixCombat();
}

function victoireCombat() {
    afficherMessage(`<b>${monstreActuel.nom} est vaincu !</b>`, "combat-area");
    // Drop
    joueurs.forEach(joueur => {
        joueur.personnages.forEach(perso => {
            if (!perso.estVivant) return;
            let drop = dropObjet(monstreActuel);
            if (drop) {
                perso.sac.push(drop);
                afficherMessage(`${perso.nom} trouve : ${drop}`, "combat-area");
                if (drop === "Potion de vie") perso.potions++;
            }
        });
    });
    setTimeout(() => {
        afficherMessage("Un nouveau monstre approche...", "combat-area");
        lancerCombat();
    }, 2000);
}

function fuirCombat() {
    afficherMessage("La troupe a fui le combat !", "combat-area");
    setTimeout(() => {
        afficherMessage("Mais un nouveau monstre surgit !", "combat-area");
        lancerCombat();
    }, 1500);
}
