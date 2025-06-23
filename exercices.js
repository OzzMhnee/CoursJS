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

function lePendu() {
    const words = [
        "abandonner","abattre","abri","absence","absolu","absolument","accent","accepter","accompagner","accomplir","accord","accorder","accrocher","accuser","acheter","achever","acte","action","admettre","adresser","affaire","affirmer","afin de","âge","âgé","agent","agir","agiter","ah","aide","aider","aile","ailleurs","aimer","ainsi","air","ajouter","aller","allumer","alors","âme","amener","ami","amour","amuser","an","ancien","anglais","anglais","angoisse","animal","animer","année","annoncer","apercevoir","apparaître","apparence","appartement","appartenir","appel","appeler","apporter","apprendre","approcher","appuyer","après","après","arbre","argent","arme","armée","armer","arracher","arrêter","arrière","arrivée","arriver","art","article","as","aspect","asseoir","assez","assister","assurer","attacher","attaquer","atteindre","attendre","attention","attirer","attitude","au","aucun","aucun","aujourd'hui","auprès","auquel","aussi","aussitôt","autant","auteur","autorité","autour","autre","autre","autrefois","autrement","avance","avancer","avant","avant","avec","avec","avenir","aventure","avis","avoir","avouer","baisser","banc","bande","barbe","bas","bas","bas","bataille","battre","beau","beau","beau","beaucoup","beauté","beaux","besoin","bête","bien","bien","bientôt","billet","blanc","blanc","bleu","blond","boire","bois","bon","bon","bonheur","bord","bouche","bout","branche","bras","briller","briser","bruit","brûler","brusquement","bureau","but","ça","cabinet","cacher","calme","calme","calmer","camarade","campagne","capable","car","caractère","caresser","carte","cas","casser","cause","causer","ce","ce","ceci","céder","cela","celui","cent","centre","cependant","cercle","certain","certain","certainement","certes","cerveau","cesse","cesser","chacun","chaîne","chair","chaise","chaleur","chambre","champ","chance","changement","changer","chant","chanter","chaque","charge","charger","chasse","chasser","chat","chaud","chef","chemin","chemise","cher","chercher","cheval","cheveu","chez","chien","chiffre","choisir","choix","chose","chute","ci","ciel","cinq","cinquante","circonstance","clair","claire","classe","clef","coeur","coin","colère","colline","colon","combat","combien","commander","comme","comme","commencement","commencer","comment","comment","commun","compagnie","compagnon","complet","complètement","composer","comprendre","compte","compter","conclure","condamner","condition","conduire","confiance","confier","confondre","connaissance","connaître","conscience","conseil","consentir","considérer","construire","consulter","contenir","content","contenter","continuer","contraire","contre","convenir","conversation","corde","corps","côte","côté","cou","couche","coucher","couler","couleur","coup","couper","cour","courage","courant","courir","cours","course","court","coûter","couvrir","craindre","crainte","créer","creuser","cri","crier","crise","croire","croiser","croix","cruel","cuisine","curieux","curiosité","d'abord","dame","danger","dangereux","dans","danser","d'autres","d'autres","davantage","de","de","debout","début","déchirer","décider","déclarer","découvrir","décrire","défaut","défendre","dégager","dehors","dehors","déjà","delà","demain","demain","demande","demander","demeurer","demi","dent","départ","dépasser","déposer","depuis","depuis","dernier","dernier","derrière","dès","descendre","désert","désespoir","désigner","désir","désirer","désormais","dessiner","dessus","détacher","détail","détruire","deux","devant","devant","devenir","deviner","devoir","devoir","dieu","différent","difficile","digne","dimanche","dire","direction","diriger","discours","discussion","discuter","disparaître","disposer","distance","distinguer","divers","dix","docteur","doigt","dominer","donc","donner","dont","dormir","dos","double","doucement","douceur","douleur","doute","douter","doux","douze","drame","dresser","droit","droit","droite","droite","drôle","du","dur","durant","durer","eau","eaux","écarter","échapper","éclairer","éclat","éclater","école","écouter","écraser","écrire","effacer","effet","effort","égal","également","eh","élément","élever","elle","éloigner","embrasser","emmener","émotion","empêcher","empire","employer","emporter","en","en","en","encore","endormir","endroit","énergie","enfance","enfant","enfermer","enfin","enfoncer","engager","enlever","ennemi","énorme","ensemble","ensemble","ensuite","entendre","entier","entourer","entraîner","entre","entrée","entrer","entretenir","envelopper","envie","environ","envoyer","épais","épaule","époque","éprouver","erreur","escalier","espace","espèce","espérer","espoir","esprit","essayer","essuyer","est","et","établir","étage","étaler","état","etc","été","éteindre","étendre","étendue","éternel","étoile","étonner","étouffer","étrange","étranger","étranger","être","être","étroit","étude","étudier","événement","éviter","examiner","exécuter","exemple","exiger","existence","exister","expérience","expliquer","exposer","expression","exprimer","extraordinaire","face","facile","façon","faible","faim","faire","fait","fait","falloir","famille","fatigue","fatiguer","faute","fauteuil","faux","faveur","femme","fenêtre","fer","ferme","fermer","fête","feu","feuille","fidèle","fier","figure","figurer","fil","fille","fils","fin","fin","fine","finir","fixe","fixer","flamme","fleur","flot","foi","fois","folie","fonction","fond","fonder","force","forcer","forêt","forme","former","fort","fort","fortune","fou","foule","frais","franc","français","français","franchir","françois","frapper","frère","froid","froid","front","fruit","fuir","fumée","fumer","fusil","gagner","garçon","garde","garder","gauche","gauche","général","général","genou","genre","gens","geste","glace","glisser","gloire","goût","goutte","gouvernement","grâce","grâce","grain","grand","grand","grandir","grave","gris","gros","groupe","guère","guerre","habiller","habitant","habiter","habitude","haine","haïr","hasard","haut","haut","haut","haute","hauteur","herbe","hésiter","heure","heureux","hier","histoire","hiver","homme","honneur","honte","horizon","hors","hôtel","huit","humain","humide","ici","idée","ignorer","il","île","image","imaginer","immense","immobile","importance","important","importer","imposer","impossible","impression","inconnu","indiquer","inquiéter","inquiétude","inspirer","installer","instant","instinct","intelligence","intention","intéresser","intérêt","intérieur","intérieur","interroger","interrompre","inutile","inventer","inviter","jamais","jambe","jardin","jaune","je","jeter","jeu","jeune","jeune","jeunesse","joie","joindre","joli","joue","jouer","jour","journal","journée","juge","juger","jusque","juste","justice","là","large","larme","le","le","léger","lendemain","lentement","lequel","lettre","leur","leur","lever","lèvre","liberté","libre","lien","lier","lieu","ligne","lire","lisser","lit","livre","livrer","loi","loin","long","long","longtemps","lors","lorsque","loup","lourd","lueur","lui","lumière","l'un","lune","l'une","lutte","lutter","machine","madame","magnifique","main","maintenant","maintenir","mais","maison","maître","mal","mal","malade","maladie","malgré","malheur","manger","manier","manquer","marchand","marche","marché","marcher","mari","mari","mariage","marier","marquer","masse","matière","matin","mauvais","me","médecin","meilleur","mêler","membre","même","même","même","mémoire","menacer","mener","mensonge","mentir","mer","mériter","mesure","métier","mettre","midi","mien","mieux","milieu","militaire","mille","million","mince","mine","ministre","minute","miser","mode","moi","moindre","moins","mois","moitié","moment","mon","monde","monsieur","montagne","monter","montrer","morceau","mort","mort","mot","mourir","mouvement","moyen","moyen","muet","mur","musique","naissance","naître","nation","nature","naturel","naturellement","ne","nécessaire","nerveux","neuf","neuf","nez","ni","noir","noir","noire","nom","nombre","nombreux","nommer","non","nord","note","notre","nourrir","nous","nouveau","nouveau","nu","nuage","nuit","nul","obéir","objet","obliger","observer","obtenir","occasion","occuper","odeur","oeil","oeuvre","officier","offrir","oh","oiseau","ombre","on","oncle","or","or","ordre","oreille","oser","ou","où","oublier","oui","ouvert","ouvrage","ouvrir","page","pain","paix","palais","papa","papier","paquet","par","paraître","parce que","parcourir","pareil","parent","parfaitement","parfois","parler","parmi","parole","part","partager","parti","particulier","partie","partir","partout","parvenir","pas","pas","passage","passé","passé","passer","passion","patron","paupière","pauvre","pauvre","payer","pays","paysage","paysan","peau","peine","pencher","pendant","pendre","pénétrer","pensée","penser","perdre","perdu","père","permettre","personnage","personne","personne","perte","peser","petit","petit","peu","peuple","peur","phrase","pièce","pied","pierre","pitié","place","placer","plaindre","plaine","plaire","plaisir","plan","planche","plante","plein","plein","pleurer","plonger","pluie","plus","plusieurs","plutôt","poche","poésie","poète","poids","point","point","pointe","poitrine","police","politique","politique","pont","port","porte","porter","portier","poser","position","posséder","possible","poste","pour","pourquoi","pourquoi","poursuivre","pourtant","pousser","poussière","pouvoir","pouvoir","précéder","précieux","précipiter","précis","préférer","premier","premier","prendre","préparer","près","près","présence","présent","présent","présenter","président","presque","presser","prêt","prétendre","prêter","preuve","prévenir","prévoir","prier","prière","prince","principe","printemps","prison","prix","problème","prochain","produire","professeur","profiter","profond","profondément","projet","promener","promettre","prononcer","propos","proposer","propre","protéger","prouver","public","public","puis","puis","puisque","puissance","puissant","pur","qualité","quand","quant à","quarante","quart","quartier","quatre","que","que","quel","quelque","quelque","quelqu'un","question","queue","qui","quinze","quitter","quoi","race","raconter","raison","ramasser","ramener","rang","rapide","rapidement","rappeler","rapport","rapporter","rare","rassurer","rayon","réalité","recevoir","recherche","réclamer","recommencer","reconnaître","recueillir","reculer","réduire","réel","réfléchir","réflexion","refuser","regard","regarder","règle","regretter","rejeter","rejoindre","relation","relever","religion","remarquer","remercier","remettre","remonter","remplacer","remplir","rencontre","rencontrer","rendre","renoncer","rentrer","renverser","répandre","repas","répéter","répondre","réponse","reposer","repousser","reprendre","représenter","réserver","résistance","résister","résoudre","respect","respecter","respirer","ressembler","reste","rester","résultat","retenir","retirer","retomber","retour","retourner","retrouver","réunir","réussir","rêve","réveiller","révéler","revenir","rêver","revoir","révolution","riche","rideau","rien","rire","rire","risquer","robe","roche","rocher","roi","rôle","roman","rompre","rond","rose","rose","rouge","rouge","rouler","route","rue","ruine","sable","sac","saint","saint","saisir","saison","salle","saluer","salut","sang","sans","santé","satisfaire","sauter","sauvage","sauver","savoir","savoir","scène","science","se","sec","second","seconde","secours","secret","secret","secrétaire","seigneur","sein","selon","semaine","semblable","sembler","sens","sentier","sentiment","sentir","séparer","sept","sérieux","serrer","service","servir","seuil","seul","seulement","si","si","siècle","siège","sien","signe","signer","signifier","silence","silencieux","simple","simplement","situation","six","social","société","soi","soin","soir","soirée","soit","sol","soldat","soleil","solitude","sombre","somme","sommeil","sommet","son","son","songer","sonner","sorte","sortir","sou","soudain","souffler","souffrance","souffrir","souhaiter","soulever","soumettre","source","sourd","sourire","sourire","sous","soutenir","souvenir","souvenir","souvent","spectacle","subir","succès","sueur","suffire","suite","suivant","suivre","sujet","supérieur","supporter","supposer","sur","sûr","surprendre","surtout","surveiller","système","table","tache","tâche","taille","taire","tandis que","tant","tantôt","tapis","tard","te","tel","tellement","témoin","tempête","temps","tendre","tendre","tenir","tenter","terme","terminer","terrain","terre","terreur","terrible","tête","théâtre","tirer","titre","toi","toile","toit","tombe","tomber","ton","ton","tôt","toucher","toujours","tour","tourner","tout","tout","tout","tout","toute","trace","tracer","train","traîner","trait","traiter","tranquille","transformer","travail","travailler","travers","traverser","trembler","trente","très","trésor","triste","trois","troisième","tromper","trop","trou","troubler","trouver","tu","tuer","type","un","un","un","unique","usage","user","vague","vague","vaincre","valeur","valoir","vaste","veille","veiller","vendre","venir","vent","ventre","véritable","vérité","verre","vers","vers","verser","vert","vêtement","vêtir","victime","vide","vide","vie","vieil","vieillard","vieux","vieux","vif","village","ville","vin","vingt","violence","violent","visage","visible","vision","visite","vite","vivant","vivre","voici","voie","voilà","voile","voir","voisin","voisin","voiture","voix","vol","voler","volonté","votre","vouloir","vous","voyage","voyager","vrai","vraiment","vue"
    ];

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
            finished = true;
            disableInput();
        }
    }

    function checkLose() {
        if (attempts <= 0) {
            document.getElementById("penduResult").innerText = "Perdu ! Le mot était : " + word;
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

    // Initialisation
    enableInput();
    displayWord();
    displayStatus();

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

// Affichage initial
displayContacts();

    



// #endregion Annuaire téléphonique