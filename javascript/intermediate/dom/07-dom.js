// DOM (Document Object Model) es un representacion en  forma de arbol de la estructura de un documento HTML. Es la amnera en que javascript hace referencia a la estructura de un documento de la web.

// Manejo del DOM

// Metodos basicos

// getElementById --> Obtiene el elemento del DOM con el id especificado

const title = document.getElementById("title");
console.log(title);

// getElementsByClassName --> Obtiene todos los elementos del DOM con la clase especificada

const paragraphs = document.getElementsByClassName("paragraph");
console.log(paragraphs);

// getElementsByTagName --> Obtiene todos los elementos del DOM con la etiqueta especificada

const divs = document.getElementsByTagName("div");
console.log(divs);

// metodos mas modernos

// querySelector --> Obtiene el primer elemento del DOM con el selector especificado

const title2 = document.querySelector("#title");
console.log(title2);

// querySelectorAll --> Obtiene todos los elementos del DOM con el selector especificado

const paragraphs2 = document.querySelectorAll(".paragraph");
console.log(paragraphs2);

// Manipulacion de elementos

title.textContent = "Nuevo titulo";

const container = document.querySelector(".container");
container.innerHTML = "<h1>Segundo titulo</h1>";

// modificacion de atributos

const link = document.querySelector("a");
link.setAttribute("href", "https://www.google.com");
link.textContent = "Google";
console.log(link);

// comprobacion de elementos

link.hasAttribute("href");

// interaccion con clases css

const encodedTitle = document.querySelector("#title");
encodedTitle.classList.add("new-class");
encodedTitle.classList.remove("new-class");
encodedTitle.classList.toggle("new-class");
encodedTitle.classList.contains("new-class");
console.log(encodedTitle);

const encodedButton = document.querySelector("button");
encodedButton.style.backgroundColor = "red";
encodedButton.style.color = "white";
encodedButton.style.padding = "10px";
encodedButton.style.borderRadius = "5px";
encodedButton.style.cursor = "pointer";
console.log(encodedButton);

const encodedInput = document.querySelector("input");
encodedInput.value = "Hello World";
console.log(encodedInput);

const encodedForm = document.querySelector("form");

// creacion 

const newDiv = document.createElement("div");
newDiv.textContent = "Nuevo div";
container.appendChild(newDiv);

// insercion en un lugar especifico

const encodedNewDiv = document.createElement("div");
encodedNewDiv.textContent = "Nuevo div";
container.insertBefore(encodedNewDiv, container.firstChild);

const secondItem = container.children[1];
container.insertBefore(encodedNewDiv, secondItem);

container.removeChild(encodedNewDiv);
container.prepend(encodedNewDiv);
encodedButton.before(encodedNewDiv);
encodedButton.after(encodedNewDiv);
encodedButton.replaceWith(encodedNewDiv);
console.log(encodedButton);

// eliminacion

encodedNewDiv.remove();
console.log(encodedNewDiv);

// Los eventos del DOM (addEventListener, bubbling, delegation)
// tienen archivo propio: 08-events.js
