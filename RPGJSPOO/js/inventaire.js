function dropObjet(monstre) {
    const drops = ["Potion de vie", "Or", "Épée rouillée"];
    if (Math.random() < 0.5) {
        return drops[randomInt(0, drops.length - 1)];
    }
    return null;
}

function afficherInventaire(joueur) {
    let html = `<h4>Inventaire ${joueur.nom}</h4>`;
    joueur.personnages.forEach(p => {
        html += `<div class="sac">${p.nom} : ${p.sac.join(", ") || "Sac vide"}</div>`;
    });
    document.getElementById('inventory-area').innerHTML = html;
}
