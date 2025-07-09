function afficherMessage(msg, cible = "game-area", append = true) {
    const el = document.getElementById(cible);
    if (append) el.innerHTML += `<p>${msg}</p>`;
    else el.innerHTML = `<p>${msg}</p>`;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
