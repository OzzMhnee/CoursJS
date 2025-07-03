var bodyNode = document.querySelector('body');
var section = document.createElement("section");


bodyNode.appendChild(section);
section.id = "ma-section";

var nota = document.createElement("p");
nota.innerHTML = "ceci est ma section";
section.appendChild(nota);

var input = document.createElement("input");
input.type = "text";
section.appendChild(input);

var btn = document.createElement("button");
var txt_btn = document.createTextNode("click to Erase");
btn.id ="btn-to-erase"
btn.appendChild(txt_btn);
section.appendChild(btn);


function erase (){
    input.value = "";
};

document.getElementById("btn-to-erase").addEventListener("click", erase);


