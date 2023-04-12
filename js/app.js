let spanList = document.querySelectorAll("span");
let divsList = document.querySelectorAll("div");

let item;
//para el elemento arrastrable
spanList.forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    e.target.classList.add("color");
    item = e.target;
    item.style.opacity = 0.5;
    console.log(item);
  });
  card.addEventListener("dragend", (e) => {
    e.target.classList.remove("color");
    console.log("dragend");
  });
});
// span.addEventListener("drag", () => {
//   console.log("drag");
// });

// div2.addEventListener("dragleave",()=>{
//   console.log("dragleave");
// })
// elemento que recibe a otro arrastrable
divsList.forEach((div) => {
  div.addEventListener("dragenter", (e) => {
    e.preventDefault();
    console.log("dragenter");
  });

  div.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("dragover");
  });

  div.addEventListener("drop", (e) => {
    e.target.appendChild(item);
    console.log(e.target);
  });
});