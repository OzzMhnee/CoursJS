// ==== Partie à renseigner par l'intégrateur ====
var containerColor = "#000000";
let radius = 260;
const radiusMin = 200;
const radiusMax = 480;
var numberOfPic = 10;
var pic1 = "https://picsum.photos/400/800";
var pic2 = "https://picsum.photos/400/801";
// ... jusqu'à pic10
// ===============================================



// Boutons sens rotation
let btnLeft = document.createElement("div");
let btnRight = document.createElement("div");
// ... styles des boutons ...
let inputRight = document.createElement("input");
inputRight.type = "radio";
inputRight.name = "sens-rotation";
inputRight.checked = true;
let inputLeft = document.createElement("input");
inputLeft.type = "radio";
inputLeft.name = "sens-rotation";
inputLeft.style.width = "0";
inputRight.style.width = "0";
btnLeft.appendChild(inputLeft);
btnRight.appendChild(inputRight);
ParentNode.appendChild(btnLeft);

let carouselContainer = document.createElement("div");
carouselContainer.className = "carousel-container";
// ... styles du container ...
ParentNode.appendChild(carouselContainer);
ParentNode.appendChild(btnRight);

// Lumière centrale au sol
let lightCenter = document.createElement("div");
// ... styles du lightCenter ...
carouselContainer.appendChild(lightCenter);

// Création des images et reflets
let pictures = [];
for (let i = 0; i < numberOfPic; i++) {
    pictures.push(window["pic" + (i + 1)]);
}


// ==== Animation/Contrôle du carrousel 3D ====
let currentRotation = 0;
let direction = 1;
let isPaused = false;
let tilt = -4; // + fort = plus aplati

function defCarousel() {
    let W = carouselContainer.offsetWidth;
    let H = carouselContainer.offsetHeight;
    let centerX = W / 2;
    let centerY = H / 2;

    for (let i = 0; i < numberOfPic; i++) {
        let angle = (2 * Math.PI / numberOfPic) * i + currentRotation;
        divs[i].style.transform = `
            translate(-50%, -50%)
            rotateX(${tilt}deg)
            rotateY(${angle * 180 / Math.PI}deg)
            translateZ(${radius}px)
        `;
        divs[i].style.zIndex = Math.round(100 * (1 + Math.cos(angle)));
        // ... gestion des reflets ...
    }
}

// MODIF radius par scroll
carouselContainer.addEventListener("wheel", function(e) {
    e.preventDefault();
    radius += -Math.sign(e.deltaY) * 18;
    radius = Math.max(radiusMin, Math.min(radiusMax, radius));
    defCarousel();
});

// Animation auto
function animate() {
    if (!isPaused) {
        currentRotation += 0.005 * direction;
        defCarousel();
    }
    requestAnimationFrame(animate);
}
defCarousel();
animate();

// Hover effet (stop rotation et désature l'image)
divs.forEach((d, i) => {
    d.addEventListener("mouseenter", () => {
        isPaused = true;
        imgDivs[i].style.filter = "none";
    });
    d.addEventListener("mouseleave", () => {
        isPaused = false;
        imgDivs[i].style.filter = "grayscale(100%)";
    });
});

// Gestion boutons rotation
function defBtnOpacity() {
    btnLeft.style.opacity = inputLeft.checked ? "1" : ".2";
    btnRight.style.opacity = inputRight.checked ? "1" : ".2";
}
defBtnOpacity();
inputLeft.addEventListener("change", defBtnOpacity);
inputRight.addEventListener("change", defBtnOpacity);

inputLeft.addEventListener("change", () => { if (inputLeft.checked) direction = -1; });
inputRight.addEventListener("change", () => { if (inputRight.checked) direction = 1; });

btnLeft.addEventListener("click", () => {
    inputLeft.checked = true;
    inputLeft.dispatchEvent(new Event("change", { bubbles: true }));
});
btnRight.addEventListener("click", () => {
    inputRight.checked = true;
    inputRight.dispatchEvent(new Event("change", { bubbles: true }));
});




// // Lumière centrale au sol
// let lightCenter = document.createElement("div");
// lightCenter.style.position = "absolute";
// lightCenter.style.left = "50%";
// lightCenter.style.top = "63%";
// lightCenter.style.width = "430px";
// lightCenter.style.height = "80px";
// lightCenter.style.transform = "translate(-50%, -50%)";
// lightCenter.style.borderRadius = "50%";
// lightCenter.style.background = "radial-gradient(ellipse at center, rgb(255, 255, 255) 10%, rgba(255, 255, 255, 0.30) 40%, rgba(255, 255, 255, 0) 100%)";
// lightCenter.style.pointerEvents = "none";
// lightCenter.style.zIndex = "1";
// lightCenter.style.filter = "blur(7px)";
// carouselContainer.appendChild(lightCenter);



// // ==== Animation/Contrôle du carrousel 3D ====
// let currentRotation = 0;
// let direction = 1;
// let isPaused = false;
// let tilt = -4; // + fort = plus aplati

// function defCarousel() {
//     // centre du carouselContainer
//     let W = carouselContainer.offsetWidth;
//     let H = carouselContainer.offsetHeight;
//     let centerX = W / 2;
//     let centerY = H / 2;

//     for (let i = 0; i < numberOfPic; i++) {
//         let angle = (2 * Math.PI / numberOfPic) * i + currentRotation;

//         // POSITIONNEMENT IMAGE EN 3D
//         divs[i].style.transform = `
//             translate(-50%, -50%)
//             rotateX(${tilt}deg)
//             rotateY(${angle * 180 / Math.PI}deg)
//             translateZ(${radius}px)
//         `;
//         divs[i].style.zIndex = Math.round(100 * (1 + Math.cos(angle)));

//              // ---- REFLET PROJETÉ AU SOL ----

//         // Calcul du "pied" de l'image sur le cercle de base (ellipse projetée au sol)
//         let baseRadius = radius;
//         let baseTilt = tilt * Math.PI / 180;
//         // Coordonnées du pied (en px) sur le sol
//         let px = centerX + baseRadius * Math.sin(angle);
//         let py = centerY + baseRadius * Math.cos(angle) * Math.cos(baseTilt);

//         // Positionne le reflet pour que son bord haut soit collé au bas de l'image
//         // On récupère la position de l'image (divs[i]) pour ajuster dynamiquement
//         const imgRect = divs[i].getBoundingClientRect();
//         const containerRect = carouselContainer.getBoundingClientRect();
//         // Position absolue du bas de l'image dans le container
//         const imgBottomX = imgRect.left - containerRect.left + imgRect.width / 2;
//         const imgBottomY = imgRect.top - containerRect.top + imgRect.height;

//         // Place le reflet juste sous l'image, orienté vers le centre lumineux
//         reflectDivs[i].style.left = (imgBottomX - 60) + "px"; // reflet width/2 = 60
//         reflectDivs[i].style.top = (imgBottomY) + "px";

//         // Calcule l'angle entre le centre lumineux et le bas de l'image
//         const dx = centerX - imgBottomX;
//         const dy = (centerY + baseRadius * Math.cos(0) * Math.cos(baseTilt)) - imgBottomY;
//         const lightAngle = Math.atan2(dy, dx) * 180 / Math.PI;

//         // Inclinaison du reflet pour qu'il "fuit" vers la lumière centrale
//         let scaleX = 1 - 0.5 * Math.abs(Math.sin(angle));
//         let scaleY = 0.45;
//         reflectDivs[i].style.transform =
//             `scaleY(${scaleY}) scaleX(${scaleX}) skewX(${12 * Math.sin(angle)}deg) rotate(${lightAngle}deg)`;

//         // Opacité dynamique : plus fort devant, plus faible derrière
//         reflectDivs[i].style.opacity = (0.13 + 0.29 * ((1 + Math.cos(angle)) / 2)).toFixed(2);
// }

// // MODIF radius par scroll
// carouselContainer.addEventListener("wheel", function(e) {
//     e.preventDefault();
//     radius += -Math.sign(e.deltaY) * 18;
//     radius = Math.max(radiusMin, Math.min(radiusMax, radius));
//     defCarousel();
// });

// // Animation auto
// function animate() {
//     if (!isPaused) {
//         currentRotation += 0.005 * direction;
//         defCarousel();
//     }
//     requestAnimationFrame(animate);
// }
// defCarousel();
// animate();

// // Hover effet (stop rotation et désature l'image)
// divs.forEach((d, i) => {
//     d.addEventListener("mouseenter", () => {
//         isPaused = true;
//         imgDivs[i].style.filter = "none";
//     });
//     d.addEventListener("mouseleave", () => {
//         isPaused = false;
//         imgDivs[i].style.filter = "grayscale(100%)";
//     });
// });

// // Gestion boutons rotation
// function defBtnOpacity() {
//     btnLeft.style.opacity = inputLeft.checked ? "1" : ".2";
//     btnRight.style.opacity = inputRight.checked ? "1" : ".2";
// }
// defBtnOpacity();
// inputLeft.addEventListener("change", defBtnOpacity);
// inputRight.addEventListener("change", defBtnOpacity);

// inputLeft.addEventListener("change", () => { if (inputLeft.checked) direction = -1; });
// inputRight.addEventListener("change", () => { if (inputRight.checked) direction = 1; });

// btnLeft.addEventListener("click", () => {
//     inputLeft.checked = true;
//     inputLeft.dispatchEvent(new Event("change", { bubbles: true }));
// });
// btnRight.addEventListener("click", () => {
//     inputRight.checked = true;
//     inputRight.dispatchEvent(new Event("change", { bubbles: true }));
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




// // // Création de la partie centrale et ajout au Parent
// // carouselList = document.createElement("ul");
// // carouselList.className = "carousel-list";

// // carouselContainer = document.createElement("div");
// // carouselContainer.className = "carousel-container";

// // carouselContainer.appendChild(carouselList);
// // ParentNode.appendChild(carouselContainer);

// // carouselContainer.style.order = "1";
// // carouselList.style.display = "flex";
// // carouselList.style.gap = "20px";

// // // Ajout des éléments du carousel en fonction des éléments renseignés par l'intégrateur
// // let pictures = [];
// // let li = [];
// // let div = [];
// // for (let i = 0; i < numberOfPic; i++) {
// //     //incrémente ma liste pictures avec les éléments entrés par l'intégrateur.
// //     pictures.push(window["pic" + (i + 1)]);
    
// //     // crée l'architecture html fonction des éléments en top
// //     li[i] = document.createElement("li");
// //     carouselList.appendChild(li[i]);

// //     div[i] = document.createElement("div");
// //     li[i].appendChild(div[i]);

// //     // Style des div background image
// //     li[i].style.listStyleType = "none";
// //     div[i].style.width = "120px";
// //     div[i].style.height = "200px";
// //     div[i].style.backgroundImage = `url('${pictures[i]}')`;
// //     div[i].style.backgroundSize = "cover";
// //     div[i].style.backgroundPosition = "center";
// //     div[i].style.filter = "grayscale(100%)";
// //     div[i].style.borderRadius = "10px";

// // }
// // /////partie ratée, ça donne un truc aléatoire
// // // let currentRotation = 0;
// // // let direction = 1; // 1 = droite, -1 = gauche
// // // let isPaused = false;
// // // const a = 200; // demi-grand axe
// // // const b = 80;  // demi-petit axe
// // // const centerX = 0;
// // // const centerY = 0;

// // // function defCarousel() {
// // //     for (let i = 0; i < numberOfPic; i++) {
// // //         let angle = (2 * Math.PI / numberOfPic) * i + currentRotation;
// // //         let x = centerX + a * Math.cos(angle);
// // //         let y = centerY + b * Math.sin(angle);
// // //         let scale = 0.7 + 0.3 * (1 + Math.sin(angle)); // effet de profondeur
// // //         div[i].style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
// // //         div[i].style.zIndex = Math.round(100 * scale);
// // //     }
// // // }
// // const a = 400; // demi-grand axe
// // const b = 80;  // demi-petit axe

// // // S'assure que le conteneur est positionné relativement pour le positionnement absolu des images
// // carouselContainer.style.position = "relative";
// // carouselList.style.position = "absolute";
// // carouselList.style.top = "0";
// // carouselList.style.left = "0";
// // carouselList.style.width = "100%";
// // carouselList.style.height = "100%";

// // // Variables d'animation

// // let direction = 1; // 1 = droite, -1 = gauche
// // let isPaused = false;

// // const carouselList = document.getElementById("carouselList");
// // const divs = carouselList.getElementsByClassName("carousel-item");
// // const numberOfPic = divs.length;
// // let currentRotation = 0;

// // carouselList.style.perspective = "1200px";
// // carouselList.style.transformStyle = "preserve-3d";

// // function defCarousel() {
// //     const radius = 300; // rayon du carrousel
// //     const tilt = 20; // inclinaison X pour ellipse (en degrés)
// //     for (let i = 0; i < numberOfPic; i++) {
// //         let angle = (2 * Math.PI / numberOfPic) * i + currentRotation;
// //         // On applique d'abord une inclinaison du plan (ellipse), puis une rotation Y, puis une translation Z
// //         divs[i].style.transform = `
// //             rotateX(${tilt}deg)
// //             rotateY(${angle * 180 / Math.PI}deg)
// //             translateZ(${radius}px)
// //         `;
// //         // Optionnel : z-index dynamique pour meilleur rendu d'empilement
// //         divs[i].style.zIndex = Math.round(100 * (1 + Math.cos(angle)));
// //     }
// // }




// // // Calcul dynamique du centre à chaque frame (pour s'adapter au redimensionnement)
// // // function defCarousel() {
// // //     const containerWidth = carouselContainer.offsetWidth;
// // //     const containerHeight = carouselContainer.offsetHeight;
// // //     const imgWidth = 120;
// // //     const imgHeight = 200;
// // //     const centerX = containerWidth / 2;
// // //     const centerY = containerHeight / 2;

// // //     // Largeur et hauteur de l’ellipse (a et b)
// // //     const a = 300; // demi-grand axe (horizontal)
// // //     const b = 120; // demi-petit axe (vertical)

// // //     for (let i = 0; i < numberOfPic; i++) {
// // //         let angle = (2 * Math.PI / numberOfPic) * i + currentRotation;
        
// // //         // Position sur ellipse projetée (manège vu en perspective)
// // //         let x = centerX + a * Math.cos(angle);
// // //         let y = centerY + b * Math.sin(angle);

// // //         // Profondeur : plus l'image est en bas (perspective), plus elle est devant
// // //         let scale = 0.7 + 0.3 * ((y - (centerY - b)) / (2 * b)); // Scale dépend de la position verticale
// // //         let zIndex = Math.round(100 * scale);

// // //         div[i].style.position = "absolute";
// // //         div[i].style.left = `${x - imgWidth / 2}px`;
// // //         div[i].style.top = `${y - imgHeight / 2}px`;
// // //         div[i].style.transform = `scale(${scale})`;
// // //         div[i].style.zIndex = zIndex;
// // //     }
// // // }
// // // S'assure que le conteneur est positionné relativement pour le positionnement absolu des images
// // carouselContainer.style.position = "relative";
// // carouselList.style.position = "absolute";
// // carouselList.style.top = "0";
// // carouselList.style.left = "0";
// // carouselList.style.width = "100%";
// // carouselList.style.height = "100%";

// // setInterval(() => {
// //     currentRotation += 0.01; // tourne tout seul
// //     defCarousel();
// // }, 20);

// // function animate() {
// //     if (!isPaused) {
// //         currentRotation += 0.006 * direction;
// //         defCarousel();
// //     }
// //     requestAnimationFrame(animate);
// // }
// // defCarousel();
// // animate();

// // div.forEach((d, i) => {
// //     d.addEventListener("mouseenter", () => {
// //         isPaused = true;
// //         d.style.filter = "none";
// //     });
// //     d.addEventListener("mouseleave", () => {
// //         isPaused = false;
// //         d.style.filter = "grayscale(100%)";
// //     });
// // });


// // function defBtnOpacity() {
// //     btnLeft.style.opacity = inputLeft.checked ? "1" : ".2";
// //     btnRight.style.opacity = inputRight.checked ? "1" : ".2";
// // }
// // defBtnOpacity();
// // inputLeft.addEventListener("change", defBtnOpacity);
// // inputRight.addEventListener("change", defBtnOpacity);
// // // direction du carousel
// // inputLeft.addEventListener("change", () => { if (inputLeft.checked) direction = -1; });
// // inputRight.addEventListener("change", () => { if (inputRight.checked) direction = 1; });

// // btnLeft.addEventListener("click", () => {
// //     inputLeft.checked = true;
// //     inputLeft.dispatchEvent(new Event("change", { bubbles: true }));
// // });
// // btnRight.addEventListener("click", () => {
// //     inputRight.checked = true;
// //     inputRight.dispatchEvent(new Event("change", { bubbles: true }));
// // });