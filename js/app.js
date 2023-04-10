window.addEventListener("load", () => {
  //variables
  let id = 0;
  let text = "";
  let alert = document.querySelector(".alert");
  let close = alert.firstElementChild;
  let input = document.querySelector("input");
  let arrow = document.querySelector(".arrow");
  let done = document.querySelectorAll(".fa-circle-check");
  let edit = document.querySelectorAll(".fa-pencil");
  let trash = document.querySelectorAll(".fa-trash");
  let taskContent = document.querySelectorAll(".task");
  //   eventos
  close.addEventListener("click", () => {
    // todo
  });
  input.addEventListener("focus", () => {
    // todo
  });
  arrow.addEventListener("click", () => {
    // todo
  });
  done.forEach((icon) => {
    icon.addEventListener("click", () => {
      // todo
    });
  });
  edit.forEach((icon) => {
    icon.addEventListener("click", () => {
      // todo
    });
  });
  trash.forEach((icon) => {
    icon.addEventListener("click", () => {
      // todo
    });
  });
  taskContent.forEach((task) => {
    task.addEventListener("click", () => {
      // todo
    });
  });
});

// funciones

const generateRow = (id, text) => {
  let newRow = document.createElement("tr");
  newRow.setAttribute("id", id);
  newRow.innerHTML = `
  <td>
  <i class="fa-solid fa-circle-check"></i>
  <span contenteditable="true" class="task">${text}</span>
</td>
<td>
  <span class="fa-stack fa-2x">
    <i class="fa-solid fa-square fa-stack-2x"></i>
    <i class="fa-solid fa-stack-1x fa-pencil fa-inverse"></i>
  </span>
</td>
<td>
  <span class="fa-stack fa-2x">
    <i class="fa-solid fa-square fa-stack-2x"></i>
    <i class="fa-solid fa-stack-1x fa-trash fa-inverse"></i>
  </span>
</td>
  `;
  return newRow;
};
