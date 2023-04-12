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
  //eventos
  //Cerrar la alerta en el botón con la X
  close.addEventListener("click", () => {
    alert.classList.add("dismissible");
  });
  //Impedir la recarga de la página y añadir una nueva tarea
  input.addEventListener("keydown", (e) => {
    if (e.code == "Enter" || e.code == "NumpadEnter") {
      e.preventDefault();
      addTask(input, id, text, alert);
    }
  });
  input.addEventListener("input", (e) => {
    if (input.value !== "" && !alert.classList.contains("dismissible")) {
      alert.classList.add("dismissible");
    }
  });
  //Añadir una nueva tarea
  arrow.addEventListener("click", () => {
    addTask(input, id, text, alert);
  });
  //Marcar la tarea como realizada
  done.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      crossOut(e);
    });
  });
  //Activar el modo edición desde el icono
  edit.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      editModeOn(e, false);
    });
  });
  //Eliminar la fila
  trash.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      removeRow(e, false);
    });
  });
  //Activar el modo edición desde la propia tarea
  taskContent.forEach((task) => {
    task.addEventListener("focus", (e) => {
      editModeOn(e, true);
    });
    task.addEventListener("blur", (e) => {
      editModeOff(e);
    });
  });
});

//funciones
//prepara una plantilla HTML, y la actualiza con contenido dinámico
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
  //Tachar una tarea realizada
  newRow.firstElementChild.firstElementChild.addEventListener("click", (e) => {
    crossOut(e);
  });
  // newRow.firstElementChild.lastElementChild.addEventListener("click", () => {
  //   // todo
  // });
  //Activar el modo edición desde la tarea
  newRow.firstElementChild.lastElementChild.addEventListener("focus", (e) => {
    editModeOn(e, true);
  });
  //Desactivar el modo edición
  newRow.firstElementChild.lastElementChild.addEventListener("blur", (e) => {
    editModeOff(e);
  });
  //Activar el modo edición desde el icono
  newRow.firstElementChild.nextElementSibling.firstElementChild.lastElementChild.addEventListener(
    "click",
    (e) => {
      editModeOn(e, false);
    }
  );
  //Eliminar la fila
  newRow.lastElementChild.firstElementChild.lastElementChild.addEventListener(
    "click",
    (e) => {
      removeRow(e, false);
    }
  );
  return newRow;
};

//Tachado de tarea
const crossOut = (e) => {
  let task = e.target.nextElementSibling;
  let text = task.innerHTML;
  if (text.includes("<del>")) {
    text = task.firstElementChild.textContent;
    task.innerHTML = text;
    task.parentNode.parentNode.setAttribute("data-completed", "false");
  } else {
    task.innerHTML = `<del>${text}</del>`;
    task.parentNode.parentNode.setAttribute("data-completed", "true");
  }
};
//Añadir nueva tarea
const addTask = (input, id, text, alert) => {
  if (input.value.trim() === "") {
    input.value = "";
    alert.classList.remove("dismissible");
  } else {
    text = input.value;
    id =
      parseInt(
        document.querySelector("tbody")?.lastElementChild?.getAttribute("id")
      ) + 1 || 0;
    document.querySelector("tbody").appendChild(generateRow(id, text));
    input.value = "";
  }
};
//Modo Edición
const editModeOn = (e, onFocus) => {
  let task;
  if (onFocus) {
    task = e.currentTarget;
  } else {
    task =
      e.currentTarget.parentNode.parentNode.previousElementSibling
        .lastElementChild;
    task.focus();
  }
  // console.log(task);
  task.classList.add("editable");
  document.addEventListener("keydown", (e) => {
    if (e.code == "Enter" || e.code == "NumpadEnter" || e.code == "Escape") {
      task.blur();
    }
  });
};
const editModeOff = (e) => {
  let task = e.currentTarget;
  if (task.innerHTML === "") {
    removeRow(e, true);
  } else {
    task.classList.remove("editable");
    task.innerHTML = clearWhitespaces(task.innerHTML);
    if (task.innerHTML === "") {
      removeRow(e, true);
    }
  }
};
//Eliminación de tarea
const removeRow = (e, editionMode) => {
  if (editionMode) {
    e.target.parentNode.parentNode.remove();
  } else {
    // console.log(e.target.parentNode.parentNode.parentNode);
    e.target.parentNode.parentNode.parentNode.remove();
  }
};
//Eliminación de espacios en blanco
const clearWhitespaces = (text) => {
  return text.replace(new RegExp(/&nbsp;/, "g"), "").trim();
};
