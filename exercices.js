// #region PopUp
// Affiche la pop-up automatiquement au chargement de la page
// window.onload = function() {
//   document.getElementById('popup').classList.add('active');
// };

// // Ferme la pop-up au clic sur la croix
// document.getElementById('close-btn').onclick = function() {
//   document.getElementById('popup').classList.remove('active');
// };
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
    const words = ["abandonner","abattre","abri","absence","absolu","absolument","accent","accepter","accompagner","accomplir","accord","accorder","accrocher","accuser","acheter","achever","acte","action","admettre","adresser","affaire","affirmer","agent","agir","agiter","ah","aide","aider","aile","ailleurs","aimer","ainsi","air","ajouter","aller","allumer","alors","amener","ami","amour","amuser","an","ancien","anglais","anglais","angoisse","animal","animer","annoncer","apercevoir","apparaitre","apparence","appartement","appartenir","appel","appeler","apporter","apprendre","approcher","appuyer","arbre","argent","arme","armee","armer","arracher","arreter","arriere","arriver","art","article","as","aspect","asseoir","assez","assister","assurer","attacher","attaquer","atteindre","attendre","attention","attirer","attitude","aucun","aucun","auteur","autorite","autour","autre","autre","autrefois","autrement","avance","avancer","avenir","aventure","avis","avoir","avouer","baisser","banc","bande","barbe","bas","bas","bas","bataille","battre","beau","beau","beau","beaucoup","beaux","besoin","bien","bien","billet","blanc","blanc","bleu","blond","boire","bois","bon","bon","bonheur","bord","bouche","bout","branche","bras","briller","briser","bruit","brusquement","bureau","but","cabinet","cacher","calme","calme","calmer","camarade","campagne","capable","car","caractere","caresser","carte","cas","casser","cause","causer","ce","ce","ceci","cela","celui","cent","centre","cependant","cercle","certain","certain","certainement","certes","cerveau","cesse","cesser","chacun","chaine","chair","chaise","chambre","champ","chance","changement","changer","chant","chanter","chaque","charge","charger","chasse","chasser","chat","chaud","chef","chemin","chemise","cher","chercher","cheval","cheveu","chez","chien","chiffre","choisir","choix","chose","chute","ci","ciel","cinq","cinquante","circonstance","clair","claire","classe","clef","coeur","coin","colere","colline","colon","combat","combien","commander","comme","comme","commencement","commencer","comment","comment","commun","compagnie","compagnon","complet","composer","comprendre","compte","compter","conclure","condamner","condition","conduire","confiance","confier","confondre","connaissance","connaitre","conscience","conseil","consentir","considerer","construire","consulter","contenir","content","contenter","continuer","contraire","contre","convenir","conversation","corde","corps","cote","cote","cou","couche","coucher","couler","couleur","coup","couper","cour","courage","courant","courir","cours","course","court","couvrir","craindre","crainte","creer","creuser","cri","crier","crise","croire","croiser","croix","cruel","cuisine","curieux","curiosite","dame","danger","dangereux","dans","danser","davantage","de","de","debout","debut","dechirer","decider","declarer","decouvrir","decrire","defaut","defendre","degager","dehors","dehors","delà","demain","demain","demande","demander","demeurer","demi","dent","depart","depasser","deposer","depuis","depuis","dernier","dernier","descendre","desert","desespoir","designer","desir","desirer","dessiner","dessus","detacher","detail","detruire","deux","devant","devant","devenir","deviner","devoir","devoir","dieu","different","difficile","digne","dimanche","dire","direction","diriger","discours","discussion","discuter","disparaitre","disposer","distance","distinguer","divers","dix","docteur","doigt","dominer","donc","donner","dont","dormir","dos","double","doucement","douleur","doute","douter","doux","douze","drame","dresser","droit","droit","droite","droite","du","dur","durant","durer","eau","eaux","ecarter","echapper","eclairer","eclat","eclater","ecole"];

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



