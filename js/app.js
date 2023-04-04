let nav = document.querySelector("nav");
console.log(nav);
let active = document.querySelector(".active");
console.log(active);
let first = document.querySelector("#first");
console.log(first);

let headerAndParagraphs = document.querySelectorAll("h1,p");
console.log(headerAndParagraphs);
console.log(headerAndParagraphs[0].innerHTML);

let firstLi = nav.firstElementChild.firstElementChild;
console.log(firstLi);
console.log(firstLi.parentElement.parentElement.previousElementSibling);
console.log(first.nextElementSibling);

let header = document.querySelector("header");
console.log(header.firstChild.nextSibling.nextElementSibling);

let ultimoParrafo = document.body.lastElementChild;
console.log(ultimoParrafo.previousElementSibling.previousElementSibling);
console.log(nav.lastElementChild.lastElementChild);
console.log(document.body);

let lista = document.querySelector("ul");
console.log(lista.children[0].children[0].firstChild.nodeValue);
console.log(first.firstChild.nodeValue);

console.log(lista.childElementCount);
console.log(lista.childNodes);
