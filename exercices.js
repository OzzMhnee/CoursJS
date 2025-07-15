// #region PopUp
// Affiche la pop-up automatiquement au chargement de la page
window.onload = function() {
  document.getElementById('popup').classList.add('active');
};

// Ferme la pop-up au clic sur la croix
document.getElementById('close-btn').onclick = function() {
  document.getElementById('popup').classList.remove('active');
};
// #endregion PopUp

// #region Définitions des types

function getDefString() {
    alert('A string is a sequence of characters enclosed in "quotes".');
}
function getDefNumber() {
    alert("A number is a numerical value that can be an integer or a floating-point number.");
}
function getDefBoolean() {
    alert("A boolean is a data type that can only be true or false.");
}
function getDefNull() {
    alert("Null is a special value that represents the absence of any object value.");
}
function getDefUndefined() {
    alert("Undefined is a data type that indicates a variable has not been assigned a value.");
}
function getDefObject() {
    alert("An object is a collection of properties, where each property has a key and a value. \nExample: { key: value }");
}
function getDefArray() {
    alert("An array is a special type of object that holds an ordered collection of values. \nExample: [value1, value2, value3]");
}
function getDefFunction() {
    alert("A function is a block of code designed to perform a particular task, which can be executed when called. \nExample: function myFunction() { /* code */ }");
}



document.getElementById("checkType").addEventListener("click", function () {
    const input = document.getElementById("typeInput").value.trim();
    let value;

    // Cas simples
    if (input === "null") {
        value = null;
    } else if (input === "undefined") {
        value = undefined;
    } else if (input === "true") {
        value = true;
    } else if (input === "false") {
        value = false;
    }

    // Nombre entier
    else if (/^-?\d+$/.test(input)) {
        value = parseInt(input, 10);
    }

    // Nombre flottant
    else if (/^-?\d*\.\d+$/.test(input)) {
        value = parseFloat(input);
    }

    // Tableau
    else if (input.startsWith("[") && input.endsWith("]")) {
        try {
            const parsed = JSON.parse(input);
            if (Array.isArray(parsed)) value = parsed;
            else value = undefined;
        } catch {
            value = undefined;
        }
    }

    // Objet
    else if (input.startsWith("{") && input.endsWith("}")) {
        try {
            const parsed = JSON.parse(input);
            if (typeof parsed === "object" && !Array.isArray(parsed) && parsed !== null) value = parsed;
            else value = undefined;
        } catch {
            value = undefined;
        }
    }

    // Chaîne avec quotes
    else if (/^(['"`])(.*)\1$/.test(input)) {
        try {
            // Utilisation d'un eval "sécurisé" juste pour parser les quotes et échappements
            value = Function(`'use strict'; return (${input});`)();
        } catch {
            value = undefined;
        }
    }

    // Autres cas → non reconnu
    else {
        value = undefined;
    }

    // Détection du type
    function returnTheType(val) {
        if (val === null) return "null";
        if (val === undefined) return "undefined";
        if (typeof val === "boolean") return "boolean";
        if (typeof val === "number") return Number.isInteger(val) ? "integer" : "float";
        if (typeof val === "string") return "string";
        if (Array.isArray(val)) return "array";
        if (typeof val === "object") return "object";
        return "undefined";
    }

    const type = returnTheType(value);

    // Affichage avec couleur
    const resultEl = document.getElementById("typeResult");
    resultEl.innerText = `Type détecté : ${type}`;
    resultEl.className = type;
});
// #endregion

// #region Medical Assistent
document.getElementById("checkPain").addEventListener("click", function () {
    let localisation = document.getElementById("painInput").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ")[0];
    let possibilities = ["head", "stomach", "back"];

    while (!possibilities.includes(localisation)) {
        localisation = prompt("I didn't understand... Where does it hurt?").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ")[0];
    }

    if (localisation === "head") {
        document.getElementById("painResult").innerHTML = "You have a headache, take a Doliprane.";
    } else if (localisation === "stomach") {
        document.getElementById("painResult").innerHTML = "You have a stomach ache, take Spasfon.";
    } else if (localisation === "back") {
        document.getElementById("painResult").innerHTML = "You have back pain, rest.";
    }
});

// #endregion

// #region dev lvl
function createMissionButtons(language) {
    const resultDiv = document.getElementById("result");

    // Crée le texte de défi
    const question = document.createElement("p");
    question.innerHTML = "Il faut vous améliorer en " + language + ". <br>Acceptez-vous le défi ?";

    // Crée les boutons Oui / Non
    const yesBtn = document.createElement("button");
    yesBtn.textContent = "Oui";

    const noBtn = document.createElement("button");
    noBtn.textContent = "Non";

    // Actions quand on clique
    yesBtn.addEventListener("click", () => {
        yesBtn.disabled = !event.target.checked;
        noBtn.hidden = true;
        resultDiv.innerHTML += "<p>Super, vous irez loin !</p>";
    });

    noBtn.addEventListener("click", () => {
        noBtn.disabled = !event.target.checked;
        yesBtn.hidden = true;
        resultDiv.innerHTML += "<p>Dommage, vous aviez du potentiel !</p>";
    });

    resultDiv.appendChild(question);
    resultDiv.appendChild(yesBtn);
    resultDiv.appendChild(noBtn);
}

function troisiemeExo() {
    const result = document.getElementById("result");
    result.innerHTML = ""; // reset

    let HTML = parseInt(document.getElementById("html").value);
    let CSS = parseInt(document.getElementById("css").value);
    let JS = parseInt(document.getElementById("js").value);
    let PHP = parseInt(document.getElementById("php").value);

    let total = (HTML + CSS + JS + PHP) / 4;
    let output = "";

   

    result.innerHTML = output;

    if (HTML < 50) {
        if (total > 12.5) {
            result.innerHTML += "Vous êtes débutant et un peu dispersé.<br>";
            createMissionButtons("HTML");
        } else {
            result.innerHTML += "Débutant mais concentré : continuez avec le HTML puis CSS.";
        }
    } else if (HTML >= 50 && HTML < 75) {
        if (CSS < 50) {
            result.innerHTML += "Intermédiaire en HTML, débutant en CSS.<br>";
            createMissionButtons("CSS");
        } else {
            result.innerHTML += "Bon en HTML et CSS, mais débutez le JavaScript.<br>";
            createMissionButtons("JavaScript");
        }
    } else if (HTML >= 75 && HTML < 80) {
        if (CSS < 75) {
            result.innerHTML += "Avancé en HTML, à renforcer en CSS.<br>";
            createMissionButtons("CSS");
        } else if (JS < 75) {
            result.innerHTML += "HTML et CSS solides, mais JavaScript encore faible.<br>";
            createMissionButtons("JavaScript");
        } else if (PHP < 75) {
            result.innerHTML += "HTML, CSS et JS solides, mais PHP à améliorer.<br>";
            createMissionButtons("PHP");
        } else {
            result.innerHTML += "Très bon niveau global. Dernier effort pour devenir expert.";
        }
    } else if (HTML >= 80 && total > 76.25) {
        result.innerHTML += "Vous êtes un expert en programmation !<br>";
        createMissionButtons("Procrastination");
    } else {
        result.innerHTML += "Continuez à progresser sur tous les langages.";
    }
}

document.getElementById("checkDev").addEventListener("click", troisiemeExo);

// #endregion

// #region FizzBuzz

///FIRST
function fizzBuzz() {
    for (let i = 1; i < 20; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            document.getElementById("firstFizz").innerHTML += "FizzBuzz -";
        } else if (i % 3 === 0) {
            document.getElementById("firstFizz").innerHTML += "Fizz -";
        } else if (i % 5 === 0) {
            document.getElementById("firstFizz").innerHTML += "Buzz -";
        } else {
            document.getElementById("firstFizz").innerHTML += i + "-";
        }
    }
}
///SECOND : TERNARY'ONE
function fizzBuzzTernary() { for (let i = 1; i<20; i++) document.getElementById("scndFizz").innerHTML += (i % 15 === 0) ? "FizzBuzz -" : (i % 3 === 0) ? "Fizz -" : (i % 5 === 0) ? "Buzz -" : i + "-"; }
// #endregion

// #region Calculatrice

// Définitions des opérations
// function factorial(a) {
//     if (a < 0) return "Indéfini";
//     if (a === 0 || a === 1) return 1;
//     let result = 1;
//     for (let i = 2; i <= a; i++) {
//         result *= i; }
//     return result; }
// function divide(a,b) {
//     return a / b; }
// function multiply(a,b) { 
//     return a * b; }
// function subtract(a,b) {
//     return a - b; }
// function addition(a, b) {
//     return a + b; }
// function carre(a) {
//     return a * a }

 // État de la calculatrice
let isOn = false;
let displayValue = "";
let cursorPosition = 0;
const display = document.getElementById('display');
const screen = document.getElementById('calcuScreen');

// Fonctions mathématiques
function factorial(a) {
    if (a < 0) return "Indéfini";
    if (a === 0 || a === 1) return 1;
    let result = 1;
    for (let i = 2; i <= a; i++) {
        result *= i; }
    return result; 
}

function divide(a, b) { return a / b; }
function multiply(a, b) { return a * b; }
function subtract(a, b) { return a - b; }
function addition(a, b) { return a + b; }
function carre(a) { return a * a; }

// Évaluation des expressions avec priorités
function evaluateExpression(expr) {
    try {
        // Gestion factorielle
        expr = expr.replace(/f\(([^)]+)\)/g, (_, num) => factorial(parseFloat(num)));
        
        // Gestion carré
        expr = expr.replace(/(\d+(\.\d+)?)\²/g, (_, num) => carre(parseFloat(num)));
        
        // Conversion en notation JS
        expr = expr.replace(/÷/g, '/').replace(/×/g, '*');
        
        // Gestion des priorités avec parenthèses
        while (expr.includes('(')) {
            expr = expr.replace(/\(([^()]+)\)/g, (_, inner) => {
                return evalPrimary(inner);
            });
        }
        
        return evalPrimary(expr);
    } catch (e) {
        return "Erreur";
    }
}

function evalPrimary(expr) {
    const tokens = expr.match(/(\d+\.\d+|\d+|[+\-*/^])/g) || [];
    let numbers = [];
    let operators = [];
    
    // Traitement des nombres et opérateurs
    for (let token of tokens) {
        if (['+', '-', '*', '/'].includes(token)) {
            while (operators.length > 0 && 
                    ['*', '/'].includes(operators[operators.length - 1]) &&
                    ['+', '-'].includes(token)) {
                applyOperator(numbers, operators);
            }
            operators.push(token);
        } else {
            numbers.push(parseFloat(token));
        }
    }
    
    while (operators.length > 0) {
        applyOperator(numbers, operators);
    }
    
    return numbers[0];
}

function applyOperator(numbers, operators) {
    const op = operators.pop();
    const b = numbers.pop();
    const a = numbers.pop();
    
    switch (op) {
        case '+': numbers.push(a + b); break;
        case '-': numbers.push(a - b); break;
        case '*': numbers.push(a * b); break;
        case '/': numbers.push(a / b); break;
    }
}

// Gestion de l'affichage et curseur
function updateDisplay() {
    display.innerHTML = displayValue.substring(0, cursorPosition) + 
                        '<span id="cursor"></span>' + 
                        displayValue.substring(cursorPosition);
}

// Activation/Désactivation
function turnOn() {
    isOn = true;
    screen.classList.remove('off');
    screen.classList.add('on');
    document.querySelectorAll('#calcu td:not(#calOn)').forEach(btn => {
        btn.classList.remove('disabled');
    });
    updateDisplay();
}

function turnOff() {
    isOn = false;
    screen.classList.remove('on');
    screen.classList.add('off');
    document.querySelectorAll('#calcu td:not(#calOn)').forEach(btn => {
        btn.classList.add('disabled');
    });
    displayValue = "";
    cursorPosition = 0;
    updateDisplay();
}

// Gestion des entrées
function insertCharacter(char) {
    if (!isOn) return;
    
    displayValue = displayValue.substring(0, cursorPosition) + 
                    char + 
                    displayValue.substring(cursorPosition);
    cursorPosition += char.length;
    updateDisplay();
}

function deleteCharacter() {
    if (!isOn || cursorPosition === 0) return;
    
    displayValue = displayValue.substring(0, cursorPosition - 1) + 
                    displayValue.substring(cursorPosition);
    cursorPosition--;
    updateDisplay();
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // État initial
    turnOff();
    
    // Gestion des boutons
    document.getElementById('calOn').addEventListener('click', turnOn);
    document.getElementById('calOff').addEventListener('click', turnOff);
    document.getElementById('calSupp').addEventListener('click', deleteCharacter);
    
    // Boutons numériques et opérations
    const buttons = [
        'zero', 'one', 'two', 'three', 'four', 'five', 
        'six', 'seven', 'eight', 'nine', 'comma',
        'divide', 'multiply', 'subtract', 'tot',
        'factorial', 'carre', 'equal'
    ];
    
    buttons.forEach(btnId => {
        document.getElementById(btnId).addEventListener('click', () => {
            if (!isOn) return;
            
            const btn = document.getElementById(btnId);
            switch(btnId) {
                case 'factorial': 
                    insertCharacter('f()');
                    cursorPosition--;
                    break;
                case 'carre': 
                    insertCharacter('²'); 
                    break;
                case 'equal': 
                    const result = evaluateExpression(displayValue);
                    displayValue = String(result);
                    cursorPosition = displayValue.length;
                    break;
                default: 
                    insertCharacter(btn.textContent);
            }
            updateDisplay();
        });
    });
    
    // Focus pour curseur
    screen.addEventListener('click', (e) => {
        if (!isOn) return;
        
        const rect = display.getBoundingClientRect();
        const x = e.clientX - rect.left;
        let charPos = 0;
        let widthSum = 0;
        
        for (let i = 0; i <= displayValue.length; i++) {
            const testSpan = document.createElement('span');
            testSpan.textContent = displayValue.substring(0, i);
            document.body.appendChild(testSpan);
            const w = testSpan.offsetWidth;
            document.body.removeChild(testSpan);
            
            if (x < widthSum + (w - widthSum) / 2) {
                charPos = i;
                break;
            }
            widthSum = w;
            charPos = i;
        }
        
        cursorPosition = charPos;
        updateDisplay();
    });
});


// Functions Head
// document.getElementById("calcuScreen").setAttribute("style", "background-color:rgba(237, 247, 98, 0.74) !important;");

// #endregion

// #region ChiFouMi

            const choixPossibles = ["pierre", "feuille", "ciseaux"];
            let scoreUtilisateur = 0;
            let scoreOrdinateur = 0;
            let manches = 0;
            let partieTerminee = false;

            function jouer(choixUtilisateur) {
            if (partieTerminee) return;

            const choixOrdinateur = choixPossibles[Math.floor(Math.random() * 3)];
            let message = `Vous : <strong>${choixUtilisateur}</strong> | Ordinateur : <strong>${choixOrdinateur}</strong> → `;

            if (choixUtilisateur === choixOrdinateur) {
                message += "Égalité !<br>";
                document.getElementById("return9").innerHTML += message;
                return;
            }

            const utilisateurGagne =
                (choixUtilisateur === "pierre" && choixOrdinateur === "ciseaux") ||
                (choixUtilisateur === "feuille" && choixOrdinateur === "pierre") ||
                (choixUtilisateur === "ciseaux" && choixOrdinateur === "feuille");

            if (utilisateurGagne) {
                scoreUtilisateur++;
                manches++;
                message += "Vous gagnez ce tour !<br>";
            } else {
                scoreOrdinateur++;
                manches++;
                message += "L'ordinateur gagne ce tour !<br>";
            }

            document.getElementById("return9").innerHTML += message;

            if (scoreUtilisateur === 2 || scoreOrdinateur === 2 || manches === 3) {
                partieTerminee = true;
                afficherResultatFinal();
            }
            }

            function afficherResultatFinal() {
            let resultat = "<hr><strong>Résultat final : </strong>";
            if (scoreUtilisateur === 2) {
                resultat += "Vous avez gagné la partie !";
            } else if (scoreOrdinateur === 2) {
                resultat += "L'ordinateur a gagné la partie.";
            } else {
                resultat += "Match nul (trop d'égalités).";
            }
            document.getElementById("return9").innerHTML += resultat + "<br><br><button onclick='resetPartie()'>Rejouer</button>";
            }

            function resetPartie() {
            scoreUtilisateur = 0;
            scoreOrdinateur = 0;
            manches = 0;
            partieTerminee = false;
            document.getElementById("return9").innerHTML = "";
            }
// #endregion

// #region Epicerie : Fin de Serie
let initialList = ["backpack", "pen", "mealCase","computer", "surprise", "paper", "eraser", "markers", "pencilcase", "pencil", "multicolor pen", "diary"]
let cardList = [];
let restList = [];
// afficher produits dans liste
for (let i = 0; i < initialList.length; i++) {
    document.getElementById("product"+i).innerHTML = initialList[i];
}
//Mettre à jour la liste des produits suivant les cases à cocher

document.getElementById("checkProduct").addEventListener("click", function () {
    for (let i = initialList.length - 1 ; i > -1 ; i--) {
        if (document.getElementById("iProduct"+i).checked) {
            document.getElementById("product"+i).style.textDecoration = "line-through";
            cardList.push(initialList[i]);
        } else { 
            restList.push(initialList[i]);
        }
    }
    document.getElementById("productCard").innerHTML = "You choosed : " + cardList.join(", ") + "<br>";
    document.getElementById("productLeft").innerHTML = "You can also add : " + initialList.join(", ") + "<br>";
});
// #endregion 

// #region lePendu

let penduState = null;
let error = 0;

function lePendu() {
    const words = ["abandonner","abattre","abri","absence","absolu","absolument","accent","accepter","accompagner","accomplir","accord","accorder","accrocher","accuser","acheter","achever","acte","action","admettre","adresser","affaire","affirmer","agent","agir","agiter","ah","aide","aider","aile","ailleurs","aimer","ainsi","air","ajouter","aller","allumer","alors","amener","ami","amour","amuser","an","ancien","anglais","anglais","angoisse","animal","animer","annoncer","apercevoir","apparaitre","apparence","appartement","appartenir","appel","appeler","apporter","apprendre","approcher","appuyer","arbre","argent","arracher","arreter","arriere","arriver","art","article","as","aspect","asseoir","assez","assister","assurer","attacher","attaquer","atteindre","attendre","attention","attirer","attitude","aucun","aucun","auteur","autorite","autour","autre","autre","autrefois","autrement","avance","avancer","avenir","aventure","avis","avoir","avouer","baisser","banc","bande","barbe","bas","bas","bas","bataille","battre","beau","beau","beau","beaucoup","beaux","besoin","bien","bien","billet","blanc","blanc","bleu","blond","boire","bois","bon","bon","bonheur","bord","bouche","bout","branche","bras","briller","briser","bruit","brusquement","bureau","but","cabinet","cacher","calme","calme","calmer","camarade","campagne","capable","car","caractere","caresser","carte","cas","casser","cause","causer","ce","ce","ceci","cela","celui","cent","centre","cependant","cercle","certain","certain","certainement","certes","cerveau","cesse","cesser","chacun","chaine","chair","chaise","chambre","champ","chance","changement","changer","chant","chanter","chaque","charge","charger","chasse","chasser","chat","chaud","chef","chemin","chemise","cher","chercher","cheval","cheveu","chez","chien","chiffre","choisir","choix","chose","chute","ci","ciel","cinq","cinquante","circonstance","clair","claire","classe","clef","coeur","coin","colere","colline","colon","combat","combien","commander","comme","comme","commencement","commencer","comment","comment","commun","compagnie","compagnon","complet","composer","comprendre","compte","compter","conclure","condamner","condition","conduire","confiance","confier","confondre","connaissance","connaitre","conscience","conseil","consentir","considerer","construire","consulter","contenir","content","contenter","continuer","contraire","contre","convenir","conversation","corde","corps","cote","cote","cou","couche","coucher","couler","couleur","coup","couper","cour","courage","courant","courir","cours","course","court","couvrir","craindre","crainte","creer","creuser","cri","crier","crise","croire","croiser","croix","cruel","cuisine","curieux","curiosite","dame","danger","dangereux","dans","danser","davantage","de","de","debout","debut","dechirer","decider","declarer","decouvrir","decrire","defaut","defendre","degager","dehors","dehors","delà","demain","demain","demande","demander","demeurer","demi","dent","depart","depasser","deposer","depuis","depuis","dernier","dernier","descendre","desert","desespoir","designer","desir","desirer","dessiner","dessus","detacher","detail","detruire","deux","devant","devant","devenir","deviner","devoir","devoir","dieu","different","difficile","digne","dimanche","dire","direction","diriger","discours","discussion","discuter","disparaitre","disposer","distance","distinguer","divers","dix","docteur","doigt","dominer","donc","donner","dont","dormir","dos","double","doucement","douleur","doute","douter","doux","douze","drame","dresser","droit","droit","droite","droite","du","dur","durant","durer","eau","eaux","ecarter","echapper","eclairer","eclat","eclater","ecole"];

    const word = words[Math.floor(Math.random() * words.length)].toLowerCase();
    let guessedLetters = [];
    let attempts = 8;
    let finished = false;

    document.getElementById("guessInput").style.display = "inline-block";
    document.getElementById("guessButton").style.display = "inline-block";
    document.getElementById("cordePendu").style.display = "inline-block";

    // Stocker l'état pour éviter plusieurs jeux en même temps
    penduState = { word, guessedLetters, attempts, finished };

    function displayWord() {
        let display = word.split("").map(letter =>
            (guessedLetters.includes(letter) || letter === " " || letter === "-") ? letter : "_"
        ).join(" ");
        document.getElementById("penduWord").innerText = display;
    }

    function displayStatus(msg = "") {
        document.getElementById("tryLeft").innerText = `Essais restants : ${attempts}`;
        document.getElementById("penduResult").innerText = `Lettres proposées : ${guessedLetters.join(", ")} ${msg}`;
    }

    function checkWin() {
        if (word.split("").every(letter => letter === " " || letter === "-" || guessedLetters.includes(letter))) {
            document.getElementById("penduResult").innerText = "Bravo ! Tu as trouvé le mot : " + word;
            swal("Good job!", "You've finded the right word!", "success");
            finished = true;
            disableInput();
        }
    }
 
    function checkLose() {
        if (attempts <= 0) {
            document.getElementById("penduResult").innerText = "Perdu ! Le mot était : " + word;
            swal("Raté!", "PatateBoy est mort à cause de vous!", "error");
            finished = true;
            disableInput();
        }
    }

    function disableInput() {
        document.getElementById("guessInput").disabled = true;
        document.getElementById("guessButton").disabled = true;
    }

    function enableInput() {
        document.getElementById("guessInput").disabled = false;
        document.getElementById("guessButton").disabled = false;
    }

    function hiddenSvg() {
        for (let i = 1; i < 9; i++) {
            document.querySelectorAll(".error"+i).forEach(el => el.style.visibility = "hidden");
        }
    }

    // Initialisation
    enableInput();
    displayWord();
    displayStatus();
    hiddenSvg();
    error = 0;

    // Gestion du bouton "Check"
    document.getElementById("guessButton").onclick = function () {
        
        
        if (finished) return;
        const guess = document.getElementById("guessInput").value.toLowerCase();
        document.getElementById("guessInput").value = "";
        if (!guess || guess.length !== 1 || !/[a-zàâçéèêëîïôûùüÿñæœ]/i.test(guess)) {
            displayStatus("→ entre une seule lettre !");
            return;
        }
        if (guessedLetters.includes(guess)) {
            displayStatus("→ lettre déjà proposée !");
            return;
        }
        guessedLetters.push(guess);
        if (!word.includes(guess)) {
            attempts--;
            error++;
            document.querySelectorAll(`.error${error}`).forEach(el => el.style.visibility = "visible");
        }
        
        

        displayWord();
        displayStatus();
        checkWin();
        checkLose();
    };
    
    
}


// Lancer une nouvelle partie au clic
document.getElementById("startPendu").addEventListener("click", lePendu);

// #endregion

// #region Annuaire téléphonique

// Tableau pour stocker les contacts
let contacts = [];

// contacts = [
//   { name: "Alice", number: "0601020304" },
//   { name: "Bob", number: "0611223344" }
// ];

// Fonction pour afficher la liste des contacts
function displayContacts(filtered = null) {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";
    const list = filtered || contacts;
    if (list.length === 0) {
        contactList.innerHTML = "<li>No contacts found.</li>";
        return;
    }
    list.forEach(contact => {
        const li = document.createElement("li");
        li.textContent = `${contact.name} : ${contact.number}`;
        contactList.appendChild(li);
    });
}

// Fonction pour ajouter un contact
function addContact() {
    const name = document.getElementById("nameInput").value.trim();
    const number = document.getElementById("numberInput").value.trim();
    const result = document.getElementById("phoneBookResult");

    if (!name || !number) {
        result.textContent = "Please enter both name and number.";
        return;
    }
    // Vérifier si le contact existe déjà
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        result.textContent = "Contact already exists.";
        return;
    }
    contacts.push({ name, number });
    result.textContent = `Contact "${name}" added!`;
    displayContacts();
    document.getElementById("nameInput").value = "";
    document.getElementById("numberInput").value = "";
}

// Fonction pour chercher un contact
function searchContact() {
    const name = document.getElementById("nameInput").value.trim().toLowerCase();
    const result = document.getElementById("phoneBookResult");

    if (!name) {
        result.textContent = "Please enter a name to search.";
        return;
    }
    const found = contacts.filter(contact => contact.name.toLowerCase().includes(name));
    if (found.length > 0) {
        result.textContent = `Found ${found.length} contact(s).`;
        displayContacts(found);
    } else {
        result.textContent = "No contact found.";
        displayContacts([]);
    }
}

// Fonction pour supprimer un contact
function deleteContact() {
    const name = document.getElementById("nameInput").value.trim().toLowerCase();
    const result = document.getElementById("phoneBookResult");

    if (!name) {
        result.textContent = "Please enter a name to delete.";
        return;
    }
    const initialLength = contacts.length;
    contacts = contacts.filter(contact => contact.name.toLowerCase() !== name);
    if (contacts.length < initialLength) {
        result.textContent = `Contact "${name}" deleted.`;
    } else {
        result.textContent = "No contact found to delete.";
    }
    displayContacts();
}

// Ajout des écouteurs d'événements
document.getElementById("addContact").addEventListener("click", addContact);
document.getElementById("searchContact").addEventListener("click", searchContact);
document.getElementById("deleteContact").addEventListener("click", deleteContact);
document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === "s") {
        searchContact();
    } else if (event.key.toLowerCase() === "d") {
        deleteContact();
    } else if (event.key.toLowerCase() === "a") {
        addContact();
    }
});
// Affichage initial
displayContacts();

    



// #endregion Annuaire téléphonique

// #region filtrage

function applyFilters() {
    const category = document.getElementById("categoryFilter").value;
    const city = document.getElementById("cityFilter").value;
    const products = document.querySelectorAll("#productList .product");

    products.forEach(product => {
        const matchCategory = !category || product.dataset.category === category;
        const matchCity = !city || product.dataset.city === city;
        product.style.display = (matchCategory && matchCity) ? "block" : "none";
    });
}

// Réinitialisation des filtres
function clearFilters() {
    document.getElementById("categoryFilter").value = "";
    document.getElementById("cityFilter").value = "";
    applyFilters();
}

// Ajout des écouteurs d'événements
document.getElementById("applyFilters").addEventListener("click", applyFilters);
document.getElementById("clearFilters").addEventListener("click", clearFilters);

// #endregion Filtrage

// #region filtrage2

function filtrer(categorie) {
    // Sélectionne tous les éléments <article> dans la section #produits
    const produits = document.querySelectorAll('#produits article');
    
    // Parcourt chaque produit de la liste
    produits.forEach(produit => {
        // Si la catégorie est "all" OU si le produit possède la classe de la catégorie sélectionnée
        if (categorie === 'all' || produit.classList.contains(categorie)) {
            // On affiche le produit (on enlève la classe 'hide')
            produit.classList.remove('hide');
        } else {
            // Sinon, on masque le produit (on ajoute la classe 'hide')
            produit.classList.add('hide');
        }
    });
}

// #endregion Filtrage2

// #region Noeuds
function sepiaModeHere() {
    if (event.target.parentNode.style.filter === "sepia(50%)") {
        event.target.parentNode.style.filter = "";
    } else {
        event.target.parentNode.style.filter = "sepia(50%)";
    }
}

function sepiaModeBefore() {
    if (event.target.parentNode.previousElementSibling.style.filter === "sepia(50%)") {
        event.target.parentNode.previousElementSibling.style.filter = "";
    } else {
       event.target.parentNode.previousElementSibling.style.filter = "sepia(50%)";
    }
}

function sepiaModeAll() {
    const grandParent = event.target.parentNode.parentNode;
    const enfants = grandParent.children;
    const allSepia = Array.from(enfants).every(child => child.style.filter === "sepia(50%)");

    Array.from(enfants).forEach(child => {
        child.style.filter = allSepia ? "" : "sepia(50%)";
    });
}
document.getElementById('btn-sepia-mode-here').addEventListener("click", sepiaModeHere);
document.getElementById('btn-sepia-mode-before').addEventListener("click", sepiaModeBefore);
document.getElementById('btn-sepia-mode-all').addEventListener("click", sepiaModeAll);

// #endregion Noeuds

// #region Palindrôme

function getResultPalindromeTest() {
    const input = document.getElementById("palindromeInput").value;
    const resultLocation = document.getElementById("palindromeResult");
    motMiroir = input.split("").reverse().join("");
    resultLocation.innerHTML = (input === motMiroir) ? input + " est bien un palindrome !" : input + " n'est pas un palindrome !";
    resultLocation.style.margin = "20px";
}

// function getResultPalindromeTest(string) {
//     return string === string.split("").reverse().join("");
// }

// const mot = "racecar";
// const mot_palindrome = getResultPalindromeTest(mot)
// console.log(mot_palindrome);

// #endregion Palindrôme

// #region  Feu tricolore

// let state = 0; // 0: green, 1: orange, 2: red

// function trafficLight() {
//     switch (state) {
//         case 0: // Green -> Orange
//             document.getElementById("greenLight").style.visibility = "hidden";
//             document.getElementById("orangeLight").style.visibility = "visible";
//             state = 1;
//             break;
//         case 1: // Orange -> Red
//             document.getElementById("orangeLight").style.visibility = "hidden";
//             document.getElementById("redLight").style.visibility = "visible";
//             state = 2;
//             break;
//         case 2: // Red -> Green
//         default:
//             document.getElementById("greenLight").style.visibility = "visible";
//             document.getElementById("redLight").style.visibility = "hidden";
//             state = 0;
//             break;
//     }
// }
// setInterval(trafficLight, 2000);

let state = 0; // 0: green, 1: orange, 2: red
setInterval(() => {
    document.getElementById("greenLight").style.visibility = state === 0 ? "visible" : "hidden";
    document.getElementById("orangeLight").style.visibility = state === 1 ? "visible" : "hidden";
    document.getElementById("redLight").style.visibility = state === 2 ? "visible" : "hidden";
    state = (state + 1) % 3;
}, 2000);

// #endregion  Feu tricolore

// #region Modale

(function() {
    // Crée le bouton d'ouverture
    const openBtn = document.createElement("button");
    openBtn.textContent = "Ouvrir la modale";
    openBtn.style.margin = "30px";
    let ParentNode = document.getElementById("modale");
    ParentNode.appendChild(openBtn);

    // Crée la modale et son overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0, 0, 0, 0.53)";
    overlay.style.display = "none";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    // Contenu de la modale
    const modal = document.createElement("div");
    modal.style.background = "#fff";
    modal.style.padding = "32px 24px";
    modal.style.borderRadius = "12px";
    modal.style.position = "relative";
    modal.style.minWidth = "320px";
    modal.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";

    // Croix de fermeture
    const closeBtn = document.createElement("span");
    closeBtn.textContent = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "12px";
    closeBtn.style.right = "18px";
    closeBtn.style.fontSize = "2rem";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.userSelect = "none";

    // Titre et contenu
    const title = document.createElement("h2");
    title.textContent = "Titre de la modale";
    const content = document.createElement("p");
    content.textContent = "Ceci est le contenu de la modale. Cliquez sur la croix ou n'importe où sur l'écran pour fermer.";

    // Assemble la modale
    modal.appendChild(closeBtn);
    modal.appendChild(title);
    modal.appendChild(content);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Effet de flou sur tout le reste de la page quand la modale est ouverte
    function setBlur(active) {
        // Sélectionne tous les éléments enfants du body sauf l'overlay et le bouton d'ouverture
        Array.from(document.body.children).forEach(child => {
            if (child !== overlay && child !== ParentNode) {
                child.style.filter = active ? "blur(4px)" : "";
            }
        });
    }

    // Ouvre la modale
    openBtn.addEventListener("click", () => {
        overlay.style.display = "flex";
        setBlur(true);
    });

    // Ferme la modale sur la croix
    closeBtn.addEventListener("click", () => {
        overlay.style.display = "none";
        setBlur(false);
    });

    // Ferme la modale en cliquant sur l'overlay (hors de la modale)
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
            setBlur(false);
        }
    });

    // Ferme la modale avec la touche "Escape"
    document.addEventListener("keydown", (e) => {
        if (overlay.style.display === "flex" && e.key === "Escape") {
            overlay.style.display = "none";
            setBlur(false);
        }
    });
})();

// #endregion Modale

// #region Somme de Listes

// Création de la div résultat si besoin
let parent = document.getElementById("sumNumberList");
let = resultDiv = document.createElement("div");
resultDiv.id = "resultSumList";
parent.appendChild(resultDiv);


class SumNumberList {
    constructor(numbers) {
        this.numbers = numbers;
    }

    sum() {
        return this.numbers.reduce((acc, n) => acc + n, 0);
    }

    displayResult(parentId = "sumNumberList", resultId = "resultSumList") {
        let resultDiv = document.getElementById(resultId);
        resultDiv.innerHTML += `Somme de la liste [${this.numbers.join(", ")}] : <b>${this.sum()}</b>` + "<br>";
    }

    static fromString(str) {
        // Extrait tous les nombres de la chaîne (ex: "1 + 2+ 3 +4")
        const numbers = str.match(/-?\d+(\.\d+)?/g)?.map(Number) || [];
        return new SumNumberList(numbers);
    }
}

// Ajout d'un input pour l'utilisateur
const inputDiv = document.createElement("div");
inputDiv.style.margin = "20px 0";
inputDiv.innerHTML = `
    <input type="text" id="sumInput" placeholder="Ex: 1 + 2 + 3 + 4" style="width:200px;">
    <button id="sumBtn">Calculer la somme</button>
`;
parent.insertBefore(inputDiv, resultDiv);

// Gestion du bouton
document.getElementById("sumBtn").addEventListener("click", function() {
    const val = document.getElementById("sumInput").value;
    const sumObj = SumNumberList.fromString(val);
    sumObj.displayResult();
});

// #endregion Somme de Listes 

// #region class Weapons and Spells

class Weapons {
    constructor(weapon1, weapon2, weapon3, weapon4) {
        this.weapon1 = weapon1;
        this.weapon2 = weapon2;
        this.weapon3 = weapon3;
        this.weapon4 = weapon4;
    }
    displayResult() {
        return `For weapons you can use a ${this.weapon1}, a ${this.weapon2}, <br>a ${this.weapon3} or a ${this.weapon4}<br>`;
    }
}
class Spells {
    constructor(spell1, spell2, spell3, spell4) {
        this.spell1 = spell1;
        this.spell2 = spell2;
        this.spell3 = spell3;
        this.spell4 = spell4;
    }
    displayResult() {
        return `For spells you can use ${this.spell1}, <br> ${this.spell2}, ${this.spell3} or ${this.spell4}<br>`;
    }
}

const myWeapons = new Weapons("boomerang", "dagger", "sword", "bazooka");
const mySpells = new Spells("Aguamenti", "Alohomora", "Immobulus", "Imperio");

const spellsAndWeapons = document.getElementById("classSpellWeapons");
spellsAndWeapons.style.textAlign = "center";
if (spellsAndWeapons) {
    spellsAndWeapons.innerHTML += mySpells.displayResult() + " <br> " + myWeapons.displayResult();
}

//#endregion class weapons and Spells

// #region characters             A fixer en css
class Competence {
    constructor(nom, degats, soin = 0, type = "attaque") {
        this.nom = nom;
        this.degats = degats;
        this.soin = soin;
        this.type = type;
    }
}

// Classe de base Personnage
class Personnage {
    constructor(nom, race, classe, pointsDeVie, competences = [], potions = 2, estVivant = true) {
        this.nom = nom;
        this.race = race;
        this.classe = classe;
        this.pointsDeVie = pointsDeVie;
        this.pointsDeVieMax = pointsDeVie;
        this.competences = competences;
        this.sac = [];
        this.potions = potions;
        this.estVivant = estVivant;
    }

    utiliserPotion() {
        if (this.potions > 0 && this.estVivant) {
            this.pointsDeVie = Math.min(this.pointsDeVie + 30, this.pointsDeVieMax);
            this.potions--;
            return true;
        }
        return false;
    }
    AfficherSynthesePersonnage() {
        if (this.estVivant === true && this.potions > 0) {
            return `${this.nom}, ${this.race} spécialisé ${this.classe}, ${this.pointsDeVie} points de vie,<br> ainsi que ${this.potions} restantes,<br> il peut ${this.competences.map(c => c.nom).join(", ")} `;
        } else if (this.estVivant === true && this.potions === 0){
            return `${this.nom}, ${this.race} spécialisé ${this.classe}, ${this.pointsDeVie} points de vie,<br> et sans potions restantes,<br> il peut ${this.competences.map(c => c.nom).join(", ")} `;
        } else {
            return `RIP ${this.nom}, ${this.race} spécialisé ${this.classe}, il n'aura pas fait long feu !`;
        }
    }
}

// Classe Guerrier qui hérite de Personnage
class Guerrier extends Personnage {
    constructor(nom, race, pointsDeVie, competences = [], potions = 2, estVivant = true, arme = "épée") {
        super(nom, race, "Guerrier", pointsDeVie, competences, potions, estVivant);
        this.arme = arme;
    }

    AfficherSynthesePersonnage() {
        return super.AfficherSynthesePersonnage() + `<br>Arme principale : ${this.arme}`;
    }
}

// Classe Mage qui hérite de Personnage
class Mage extends Personnage {
    constructor(nom, race, pointsDeVie, competences = [], potions = 2, estVivant = true, element = "feu") {
        super(nom, race, "Mage", pointsDeVie, competences, potions, estVivant);
        this.element = element;
    }

    AfficherSynthesePersonnage() {
        return super.AfficherSynthesePersonnage() + `<br>Élément : ${this.element}`;
    }
}

// Classe Barde qui hérite de Personnage
class Barde extends Personnage {
    constructor(nom, race, pointsDeVie, competences = [], potions = 2, estVivant = true, instrument = "lyre") {
        super(nom, race, "Barde", pointsDeVie, competences, potions, estVivant);
        this.instrument = instrument;
    }

    AfficherSynthesePersonnage() {
        return super.AfficherSynthesePersonnage() + `<br>Instrument : ${this.instrument}`;
    }
}

// Génération de compétences
const competenceFeu = new Competence("Boule de Feu", 30);
const competenceChant = new Competence("Chant magique", 15);
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const competenceSoinApproximatif = new Competence("Chant de Vie", 0, randomInt(-15, 15), "soin");

// Création des personnages avec héritage
const wrandrall = new Guerrier("Wrandrall", "Humain croisé démon", 100, [
    new Competence("Coup d'épée", 20),
    new Competence("Esquive", 0)
], 2, true, "épée");
const zarakai = new Guerrier("Zarakaï", "Nain", 120, [
    new Competence("Coup de marteau", 25),
    new Competence("Charge", 15)
], 2, true, "marteau");
const enoriel = new Barde("Enoriel", "Elfe", 90, [
    competenceChant
], 2, true, "flûte");
const zehirmahnn = new Mage("Zehirmahnn", "Zorlim", 110, [
    competenceFeu,
    new Competence("Bouclier de Flammes", 0)
], 2, true, "feu");
const guertrude = new Guerrier("Guertrude", "Humaine", 80, [
    new Competence("Coup de hache", 18),
    new Competence("Taper, puis viser", 0)
], 2, true, "hache");
const trichelieu = new Personnage("Trichelieu", "Elfe noir", "Assassin", 70, [
    new Competence("Castration", 22),
    competenceSoinApproximatif
]);
const personnagesDisponibles = [wrandrall, zarakai, enoriel, zehirmahnn, guertrude, trichelieu];

console.log(guertrude.AfficherSynthesePersonnage());

const charactersList = document.getElementById("characters-list");
if (charactersList) {
    personnagesDisponibles.forEach(perso => {
        const li = document.createElement("li");
        li.innerHTML = `<b>${perso.nom}</b><br>${perso.AfficherSynthesePersonnage()}`;
        charactersList.appendChild(li);
    });
}

// #endregion characters

// #region Ajax débutant
function displayQuotes() {
    fetch('/exercices.json')
        .then(response => response.json())
        .then(data => {
            const quotes = data;
            const quotesList = document.getElementById('quotes-list');
            quotesList.innerHTML = '';
            quotes.forEach(quote => {
                const quoteElement = document.createElement('li');
                quoteElement.textContent = quote.favorite_quote;
                quotesList.appendChild(quoteElement);
            });
        })
        .catch(error => console.error('Error:', error));
}
// #endregion Ajax débutant

// #region Ajax intermédiaire
function displayUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const ul = document.getElementById("userlist");
            ul.innerHTML = ""; // Vide la liste avant d'ajouter les nouveaux éléments
            users.forEach(user => {
                const li = document.createElement("li");
                li.textContent = user.name + " live in " + user.address.city + ".";
                ul.appendChild(li);
            });
        })
        .catch(error => {
            alert("Erreur lors du chargement des utilisateurs : " + error);
        });
}
// #endregion Ajax intermédiaire

// #region Ajax Charger Post
function UploadPost() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(post => {
            const postDiv = document.getElementById('post');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;
        })
        .catch(error => {
            document.getElementById('post').innerHTML = "Erreur lors du chargement du post : " + error;
        });
}
// #endregion

// #region Afficher météo
function showWeather() {
    const city = document.getElementById("weatherCity").value.trim();
    const weatherDiv = document.getElementById("weather");
    if (!city) {
        weatherDiv.textContent = "Please enter a city.";
        return;
    }
    weatherDiv.textContent = "Loading...";
    fetch(`https://wttr.in/${encodeURIComponent(city)}?format=3`)
        .then(response => {
            if (!response.ok) throw new Error("Unknown city or service unavailable");
            return response.text();
        })
        .then(weather => {
            weatherDiv.textContent = weather;
        })
        .catch(error => {
            weatherDiv.textContent = "Error: " + error.message;
        });
}
// #endregion

// #region Afficher titre de tous les posts
function loadAllTitles() {
    const titlesUl = document.getElementById("titles");
    titlesUl.innerHTML = "Loading...";
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(response => response.json())
        .then(posts => {
            titlesUl.innerHTML = "";
            posts.forEach(post => {
                const li = document.createElement("li");
                li.textContent = post.title;
                titlesUl.appendChild(li);
            });
        })
        .catch(error => {
            titlesUl.innerHTML = "Error loading titles: " + error;
        });
}
// #endregion

// #region Horloge

let cityList = [];
let cityInput = document.querySelector("#LocalTime input");
let result = document.getElementById("oClock");

// Chargement du JSON de villes (on suppose que le fichier est dans /data/city.list.json)
fetch("data/city.list.json")
    .then(response => response.json())
    .then(data => {
        cityList = data;
        setupCityAutocomplete();
    })
    .catch(() => {
        // Si le JSON est trop gros ou indisponible, on ne fait rien
    });

function setupCityAutocomplete() {
    // Crée un datalist pour l'autocomplétion
    let datalist = document.createElement("datalist");
    datalist.id = "cityDatalist";
    document.body.appendChild(datalist);
    cityInput.setAttribute("list", "cityDatalist");

    // On ne met que les 5000 premières villes pour la perf
    let options = cityList.slice(0, 955000).map(city => {
        let label = city.name;
        if (city.country) label += " (" + city.country + ")";
        return `<option value="${label}">`;
    }).join("");
    datalist.innerHTML = options;
}

function showLocalTime() {
    if (!cityInput || !result) return;
    const userInput = cityInput.value.trim();

    // Recherche la ville dans la liste
    let foundCity = cityList.find(city => {
        let label = city.name;
        if (city.country) label += " (" + city.country + ")";
        return label.toLowerCase() === userInput.toLowerCase();
    });

    if (!foundCity) {
        result.textContent = "Ville inconnue. Essayez d'utiliser l'autocomplétion.";
        return;
    }

    // On tente de deviner le fuseau horaire à partir du pays (pour une vraie appli, il faudrait une base de données fuseau/city)
    // Ici, on propose quelques cas courants, sinon on affiche l'heure locale du navigateur
    let tz = getTimezoneFromCountry(foundCity.country, foundCity.coord);

    try {
        const now = new Date();
        const options = { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const time = now.toLocaleTimeString('fr-FR', options);
        result.innerHTML = `Heure locale à ${foundCity.name} (${foundCity.country}) : ${time} <br> [${tz}]`;
    } catch (e) {
        result.textContent = "Fuseau horaire inconnu pour cette ville.";
    }
}

// Fonction utilitaire pour deviner le fuseau horaire à partir du pays et des coordonnées
function getTimezoneFromCountry(country, coord) {
    // Utilise GeoNames pour obtenir le fuseau horaire précis
    // Remplacez 'demo' par votre propre nom d'utilisateur GeoNames si besoin
    const username = 'demo';
    const url = `https://secure.geonames.org/timezoneJSON?lat=${coord.lat}&lng=${coord.lon}&username=${username}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.timezoneId) {
                return data.timezoneId;
            }
            // Fallback si GeoNames ne répond pas correctement
            return getFallbackTimezone(country, coord);
        })
        .catch(() => getFallbackTimezone(country, coord));
}

// Fallback local si GeoNames ne répond pas
function getFallbackTimezone(country, coord) {
    switch (country) {
        case "FR": return "Europe/Paris";
        case "US":
            if (coord.lon < -100) return "America/Los_Angeles";
            if (coord.lon < -85) return "America/Denver";
            if (coord.lon < -70) return "America/Chicago";
            return "America/New_York";
        case "GB": return "Europe/London";
        case "DE": return "Europe/Berlin";
        case "IT": return "Europe/Rome";
        case "ES": return "Europe/Madrid";
        case "RU": return "Europe/Moscow";
        case "JP": return "Asia/Tokyo";
        case "CN": return "Asia/Shanghai";
        case "IN": return "Asia/Kolkata";
        case "BR": return "America/Sao_Paulo";
        case "CA":
            if (coord.lon < -100) return "America/Vancouver";
            return "America/Toronto";
        default: return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
}

// Modifie showLocalTime pour gérer la promesse
function showLocalTime() {
    if (!cityInput || !result) return;
    const userInput = cityInput.value.trim();

    // Recherche la ville dans la liste
    let foundCity = cityList.find(city => {
        let label = city.name;
        if (city.country) label += " (" + city.country + ")";
        return label.toLowerCase() === userInput.toLowerCase();
    });

    if (!foundCity) {
        result.textContent = "Ville inconnue. Essayez d'utiliser l'autocomplétion.";
        return;
    }

    // Appel asynchrone à GeoNames pour obtenir le fuseau horaire
    getTimezoneFromCountry(foundCity.country, foundCity.coord)
        .then(tz => {
            try {
                const now = new Date();
                const options = { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' };
                const time = now.toLocaleTimeString('fr-FR', options);
                result.innerHTML = `Heure locale à ${foundCity.name} (${foundCity.country}) : ${time} <br> [${tz}]`;
            } catch (e) {
                result.textContent = "Fuseau horaire inconnu pour cette ville.";
            }
        });
}
// #endregion

// #region Help for position
function displayTheLocation() {
    const angle = parseFloat(document.getElementById("degres").value);
    const dist = parseFloat(document.getElementById("dist").value);
    const X1 = 250, Y1 = 250;
    const showing = document.getElementById("locationXY");
    if (isNaN(angle)) {
        showing.innerHTML = "Veuillez entrer un angle valide.";
        return;
    }
    // Utilise Math.cos et Math.sin (et non cos/sin)
    const X2 = X1 + (dist * Math.cos(angle * Math.PI / 180));
    const Y2 = Y1 + (dist * Math.sin(angle * Math.PI / 180));
    showing.innerHTML += "positionnement X2 " + X2.toFixed(2) + " Y2 " + Y2.toFixed(2) + "<br>";
}
// #endregion

// #region
// #endregion

// #region
// #endregion

// #region
// #endregion