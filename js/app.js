let span = document.querySelector("span");

let box1 = document.querySelector("section").firstElementChild;
let box2 = box1.nextElementSibling;
let box3 = box2.nextElementSibling;

let user = document.querySelector("#user");
let city = document.querySelector("#city");

console.log(box1.dataset.boxNumber);
console.log(user.dataset.name);
user.dataset.name ="Sarah Connor"
console.log(user.dataset.name);
console.log(city.dataset.cityName);
city.dataset.cityName="Madrid"
console.log(city.dataset.cityName);

box1.classList.add("dark");
box2.classList.add("light");
setTimeout(() => {
  box1.classList.remove("dark");
  box2.classList.toggle("light");
}, 2000);
setTimeout(() => {
  box2.classList.toggle("light");
}, 1000);

if (box2.classList.contains("light")) {
  box3.classList.add("dark");
} else {
  box2.classList.add("light");
}
const trafficlight = () =>{  

let on = false;
setInterval(() => {
  if (
    !box1.classList.contains("red") &&
    !box2.classList.contains("yellow") &&
    !box3.classList.contains("green")
  ) {
    box1.classList.add("red");
    on = true;
  } else if (box1.classList.contains("red") && on == false) {
    box1.classList.remove("red");
    box2.classList.add("yellow");
    on = true;
  } else if (box2.classList.contains("yellow") && on == false) {
    box2.classList.remove("yellow");
    box3.classList.add("green");
    on = true;
  } else if (box3.classList.contains("green") && on == false) {
    box3.classList.remove("green");
    box1.classList.add("red");
  }
  on = false;
}, 3000);
}