///////////////////////////////////////////////////////////
////////// Partie à renseigner par l'intégrateur //////////
///////////////////////////////////////////////////////////
// #region Partie à renseigner par l'intégrateur
// import { carouselVideo } from './carrouselVideo.js';

// window.containerColor = "#000000";
// window.radius = 300;
// window.radiusMin = 230;
// window.radiusMax = Math.min(480, window.innerWidth * 0.35);
// window.numberOfMov = 4;
// window.mov1 = "https://www.youtube.com/watch?v=kOxxBToExWo";
// window.mov2 = "https://www.youtube.com/watch?v=Fb1Z3cMAlrc";
// window.mov3 = "https://www.youtube.com/watch?v=0mdZYnCUxAQ";
// window.mov4 = "https://www.youtube.com/watch?v=D65RKsLKmZ8";

// window.ParentNode = document.getElementById("carouselVideo-location#01");

// carouselVideo();

// // window.containerColor = "#000000";
// // window.radius = 300;
// // window.radiusMin = 230;
// // window.radiusMax = Math.min(480, window.innerWidth * 0.35);
// // window.numberOfMov = 6;
// // window.mov1 = "https://www.youtube.com/watch?v=6d27K-nxi48";
// // window.mov2 = "https://www.youtube.com/watch?v=pibSbfAPE-g";
// // window.mov3 = "https://www.youtube.com/watch?v=K8zPJV66s3s";
// // window.mov4 = "https://www.youtube.com/watch?v=-6lMRysFhrM";
// // window.mov5 = "https://www.youtube.com/watch?v=10t-FGfPsqo";
// // window.mov6 = "https://www.youtube.com/watch?v=Vj4474vTtQ8";
// // window.ParentNode = document.getElementById("carouselVideo-location#02");

// // carouselVideo();
// #endregion
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////




// ===================================================== //
// ===================================================== //
// ===================================================== //
// ===================================================== //
// ===================================================== //

export function carouselMovies() {

    ///////////////////////////////////////////////////////////
    ////////// Récupération des variables globales ////////////
    ///////////////////////////////////////////////////////////
    // #region Récupération des variables globales
    let containerColor = window.containerColor;
    let radius = window.radius;
    let radiusMin = window.radiusMin;
    let radiusMax = window.radiusMax;
    let numberOfMov = window.numberOfMov;
    let ParentNode = window.ParentNode;
    // #endregion

    ///////////////////////////////////////////////////////////
    ///////////// Création du container Carrousel /////////////
    ///////////////////////////////////////////////////////////
    // #region Création du container Carrousel
    ParentNode.style.backgroundColor = containerColor;  // Variable renseignée par l'intégrateur
    ParentNode.style.height = "60vh";
    ParentNode.style.display = "flex";
    ParentNode.style.justifyContent = "space-evenly";
    ParentNode.style.alignItems = "center";
    // #endregion

    ///////////////////////////////////////////////////////////
    //////////////// Boutons sens de rotation /////////////////
    ///////////////////////////////////////////////////////////
    // #region Boutons sens de rotation

    // Création
    let btnLeft = document.createElement("div");
    let btnRight = document.createElement("div");
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
    ParentNode.appendChild(btnRight);
    btnLeft.style.order = "0";
    btnRight.style.order = "2";

    // Style
    inputLeft.style.width = "0";
    btnLeft.style.clipPath = "polygon(0% 50%, 100% 0%, 100% 100%)";
    btnLeft.style.background = "#ffffff";
    btnLeft.style.opacity = ".2";
    btnLeft.style.width = "40px";
    btnLeft.style.height = "80px";
    btnLeft.style.cursor = "pointer";

    inputRight.style.width = "0";
    btnRight.style.clipPath = "polygon(100% 50%, 0% 0%, 0% 100%)";
    btnRight.style.background = "#ffffff";
    btnRight.style.opacity = ".2";
    btnRight.style.width = "40px";
    btnRight.style.height = "80px";
    btnRight.style.cursor = "pointer";
    // #endregion

    ///////////////////////////////////////////////////////////
    //////////////// Création du carrousel 3D /////////////////
    ///////////////////////////////////////////////////////////
    // #region Création du carrousel 3D
    let carouselContainer = document.createElement("div");
    carouselContainer.className = "carousel-container";
    carouselContainer.style.order = "1";
    carouselContainer.style.height = "100%";
    carouselContainer.style.position = "relative";
    carouselContainer.style.perspective = "1200px";
    carouselContainer.style.transformStyle = "preserve-3d";
    carouselContainer.style.display = "flex";
    carouselContainer.style.justifyContent = "center";
    carouselContainer.style.alignItems = "center";
    carouselContainer.style.overflow = "visible";
    carouselContainer.style.minWidth = "400px";  ///revenir faire des tests vw
    carouselContainer.style.maxWidth = "100%";  ///revenir faire des tests vw
    ParentNode.appendChild(carouselContainer);
    ParentNode.appendChild(btnRight);
    // #endregion

    ///////////////////////////////////////////////////////////
    //////////////// Ajout lumière centrale ///////////////////
    ///////////////////////////////////////////////////////////
    // #region Ajout lumière centrale
    let light = document.createElement("div");
    light.style.position = "absolute";
    light.style.left = "50%";
    light.style.top = "67%";
    light.style.width = "430px";
    light.style.height = "80px";
    light.style.transform = "translate(-50%, -50%)";
    light.style.borderRadius = "50%";
    light.style.background = "radial-gradient(ellipse at center, rgb(255, 255, 255) 10%, rgba(255, 255, 255, 0.30) 40%, rgba(255, 255, 255, 0) 100%)";
    light.style.pointerEvents = "none";
    light.style.zIndex = "1";
    light.style.filter = "blur(7px)";
    carouselContainer.appendChild(light);
    // #endregion


    ///////////////////////////////////////////////////////////
    ///////////// Création des vidéos //////////////
    ///////////////////////////////////////////////////////////
    // #region Création des vidéos
    let movies = [];
    for (let i = 0; i < numberOfMov; i++) {
        movies.push(window["mov" + (i + 1)]);
    }

    let divs = [];
    let movDivs = [];
    let reflectDivs = [];

    for (let i = 0; i < numberOfMov; i++) {
        let div = document.createElement("div");
        div.className = "carousel-item";
        div.style.width = "280px";
        div.style.height = "157.5px";
        div.style.position = "absolute";
        div.style.top = "55%";
        div.style.left = "50%";
        div.style.transform = "translate(-50%, -50%)";
        div.style.borderRadius = "12px";
        div.style.overflow = "visible";
        div.style.transition = "filter 3s, z-index 0.3s, transform 1s cubic-bezier(.32,2,.55,.27)";
        div.style.cursor = "pointer";
        div.style.zIndex = "2";

        // vidéo
        let movDiv = document.createElement("div");
        movDiv.innerHTML = `<iframe src="${movies[i].replace("watch?v=", "embed/")}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;  web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        movDiv.style.height = "157.5px";
        movDiv.style.width = "280px";
        movDiv.style.backgroundImage = `url('${movies[i]}')`;
        movDiv.style.backgroundSize = "cover";
        movDiv.style.backgroundPosition = "center";
        movDiv.style.filter = "grayscale(100%)";
        movDiv.style.borderRadius = "12px";
        movDiv.style.transition = "filter 3s, z-index 0.3s, transform 1s cubic-bezier(.32,2,.55,.27)";
        movDiv.style.position = "absolute";
        movDiv.style.left = "0";
        movDiv.style.top = "0";


        div.appendChild(movDiv);
        
        carouselContainer.appendChild(div);
        divs.push(div);
        movDivs.push(movDiv);
    }
    // #endregion

    ///////////////////////////////////////////////////////////
    /////////// Animation/Contrôle du carrousel 3D ////////////
    ///////////////////////////////////////////////////////////
    // #region Animation/Contrôle du carrousel 3D
    let currentRotation = 0;
    let direction = 1;
    let isPaused = false;
    let tilt = -4; // + fort = plus aplati

    function defCarousel() {
        // centre du carouselContainer
        let W = carouselContainer.offsetWidth;

        let H = carouselContainer.offsetHeight;
        let centerX = W / 2;
        let centerY = H / 2;

        for (let i = 0; i < numberOfMov; i++) {
            let angle = (2 * Math.PI / numberOfMov) * i + currentRotation;

            // POSITIONNEMENT vidéo EN 3D
            divs[i].style.transform = `
                translate(-50%, -50%)
                rotateX(${tilt}deg)
                rotateY(${angle * 180 / Math.PI}deg)
                translateZ(${radius}px)
            `;
            divs[i].style.zIndex = Math.round(100 * (1 + Math.cos(angle)));
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

    // Hover effet (stop rotation et désature l'vidéo)
    divs.forEach((d, i) => {
        d.addEventListener("mouseenter", () => {
            isPaused = true;
            movDivs[i].style.filter = "none";
            movDivs[i].style.transform = "scale(1.6)";
        });
        d.addEventListener("mouseleave", () => {
            isPaused = false;
            movDivs[i].style.filter = "grayscale(100%)";
            movDivs[i].style.transform = "scale(1)";
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
    // #endregion
}


///////////////////////////////////////////////////////////
////////////////  /////////////////
///////////////////////////////////////////////////////////
// #region 
// #endregion