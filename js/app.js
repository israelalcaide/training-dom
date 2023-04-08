let section = document.querySelector("section")

let div1 = section.firstElementChild
let div2 = div1.nextElementSibling
let div3 = div2.nextElementSibling

div1.addEventListener("click", (e) => {
  e.stopPropagation()
console.log("div1");
if(e.target.classList.contains("dark")){
  e.target.classList.remove("dark");
}
e.target.classList.remove("red");
div2.classList.add("dark");
div3.classList.add("dark");
div2.classList.remove("yellow");
div3.classList.remove("green");
});
div2.addEventListener("click", (e) => {
console.log("div2");
if(e.target.classList.contains("dark")){
  e.target.classList.remove("dark");
}
e.target.classList.add("yellow");
div1.classList.add("dark");
div3.classList.add("dark");
div1.classList.remove("red");
div3.classList.remove("green");

});
div3.addEventListener("click", (e) => {
console.log("div3");
if(e.target.classList.contains("dark")){
  e.target.classList.remove("dark");
}
e.target.classList.add("green");
div1.classList.add("dark");
div2.classList.add("dark");
div1.classList.remove("green");
div2.classList.remove("yellow");
});

section.addEventListener("click", (e)=> {
  console.log(("click de la seccion"));
})

