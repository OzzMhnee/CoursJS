


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
function fizzBuzzTernary() { for (let i = 1; 1<20; i++) document.getElementById("scndFizz").innerHTML += (i % 15 === 0) ? "FizzBuzz -" : (i % 3 === 0) ? "Fizz -" : (i % 5 === 0) ? "Buzz -" : i + "-"; }
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

// #endregion 
