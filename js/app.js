// //document.body.innerHTML="<h1>Waw</h1>"
// let section = document.querySelector("section");
// console.log(section.innerHTML);
// console.log(section.outerHTML);
// //section.outerHTML="<h1>Waw</h1>"
// document.body.insertAdjacentHTML("afterbegin", "<h1>Waw</h1>");
// section.insertAdjacentHTML("beforebegin", "<h2>Hello</h2>");
// // beforeend - afterend
// section.insertAdjacentHTML("beforeend", "<span>Holidays</span>");
// let box2 = section.firstElementChild.nextElementSibling
// box2.insertAdjacentHTML("afterbegin", "2")
// section.insertAdjacentHTML("afterend", "<footer>codeteam 12</footer>")

// // stronger together
// document.querySelector("h1").textContent="stronger together"
// console.log(document.querySelector("h1").textContenr);

let header = document.createElement("h1");
header.append("Hello World!");
document.body.append(header);
header.prepend("!")
header.firstChild.before("!!")

let paragraph = document.createElement("p")
paragraph.textContent= "CodeTeam Best"
header.after(paragraph)
paragraph.replaceWith(header)
document.querySelector("section").remove()
header.style.backgroundColor="darkolivegreen"
header.style.padding ="2em"
header.style.color ="white"
header.style.fontSize ="3.5rem"
header.style.textAlign="center"
header.setAttribute("class","main p-1 m-2")
//console.log( header.getAttribute("class"));

let hero = {
  heroName: "hulk",
  color:"green",
  power:"super strengh",
};
console.log(Object.values(hero));
let propiedades = Object.values(hero);
propiedades.forEach((prop)=>{
  console.log(prop);
})

//let propiedades = Object.keys(header.style);
//propiedades.forEach((prop)=>{
//  console.log(header.style[prop]);
//});