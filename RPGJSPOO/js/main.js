window.onload = function() {
    afficherPrologue();
    // Gestion du thème
    document.getElementById('theme-toggle').onclick = function() {
        document.body.classList.toggle('theme-clair');
        // Optionnel : sauvegarde le choix dans le localStorage
        localStorage.setItem('theme', document.body.classList.contains('theme-clair') ? 'clair' : 'sombre');
    };
    // Restaure le thème au chargement
    if (localStorage.getItem('theme') === 'clair') {
        document.body.classList.add('theme-clair');
    }
};

function afficherPrologue() {
    let prologue = `
        <h2>Prologue</h2>
        <p>Voici vos compagnons de route pour la quête :</p>
        <ul>
            <li>Wrandrall, humain croisé démon, couard mais armé d'une flamberge.</li>
            <li>Zarakaï, nain loyal-bon à la barbe fournie et au marteau enchanté.</li>
            <li>Enoriel, elfe barde hautain, cynique, maître du chant et de la harpe.</li>
            <li>Zehirmahnn, zorlim magicien du feu, médiateur à la peau rouge.</li>
        </ul>
        <p>La troupe arrive devant le château, prête à affronter de terribles dangers...</p>
        <div id="mode-select"></div>
    `;
    document.getElementById('prologue').innerHTML = prologue;
    afficherChoixMode();
}

function afficherChoixMode() {
    document.getElementById('mode-select').innerHTML = `
        <h3>Choisissez le mode de jeu :</h3>
        <button class="bouton" onclick="initialiserJeu(1)">1 Joueur</button>
        <button class="bouton" onclick="initialiserJeu(2)">2 Joueurs</button> `;
}

function initialiserJeu(nbJoueurs) {
    nombreDeJoueurs = nbJoueurs;
    joueurs = [];
    if (nbJoueurs === 1) {
        joueurs.push({ nom: "Joueur 1", personnages: personnagesDisponibles.map(p => Object.assign(Object.create(Object.getPrototypeOf(p)), p)) });
    } else {
        // Séparation 2 persos chacun
        joueurs.push({ nom: "Joueur 1", personnages: personnagesDisponibles.slice(0,2).map(p => Object.assign(Object.create(Object.getPrototypeOf(p)), p)) });
        joueurs.push({ nom: "Joueur 2", personnages: personnagesDisponibles.slice(2,4).map(p => Object.assign(Object.create(Object.getPrototypeOf(p)), p)) });
    }
    document.getElementById('prologue').style.display = "none";
    document.getElementById('mode-select').style.display = "none";
    lancerCombat();
}
