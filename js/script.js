let input = document.querySelector(".input");
let add = document.querySelector(".add");
let Delete = document.querySelector(".delete");
let tasksDiv = document.querySelector(".tasks");
////////////////
let TextArray = [];
if (localStorage.getItem("tasks")) {
  TextArray = JSON.parse(localStorage.getItem("tasks"));
}
///////////////
add.onclick = function () {
  if (input.value !== "") {
    addTasksToArray(input.value);
    addTasksToDom(TextArray);
    input.value = "";
    addTasksToLocalStorage(TextArray);
  }
};
//////////////
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    deleteTaskFromLocalStoage(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.parentElement.remove();
  }
  if (e.target.classList.contains("fa-check")) {
    toggleTaskToLocalStorage(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    e.target.parentElement.parentElement.classList.toggle("done");
  }
});

//////////////
const addTasksToArray = (inputText) => {
  const task = {
    id: Date.now(),
    title: inputText,
    completed: false,
  };
  TextArray.push(task);
};

const addTasksToDom = (TextArray) => {
  tasksDiv.innerHTML = "";
  TextArray.forEach((task) => {
    let div = document.createElement("div");
    div.classList.add("task");
    if (task.completed) {
      div.classList.add("done");
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    //////////////
    let i = document.createElement("i");
    i.classList.add("fa-solid");
    i.classList.add("fa-check");
    i.classList.add("sty");
    span.appendChild(i);
    ///////////////
    let I = document.createElement("i");
    I.classList.add("fa-solid");
    I.classList.add("fa-trash-can");
    I.classList.add("sty");
    span.appendChild(I);
    ///////////////
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
};
const addTasksToLocalStorage = (TextArray) => {
  window.localStorage.setItem("tasks", JSON.stringify(TextArray));
};
const getTasksFromLocalStorage = () => {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToDom(tasks);
  }
};
/////////////
getTasksFromLocalStorage();
////////////
const deleteTaskFromLocalStoage = (taskId) => {
  TextArray = TextArray.filter((task) => task.id != taskId);
  addTasksToLocalStorage(TextArray);
};
const toggleTaskToLocalStorage = (toggleTaskId) => {
  for (let i = 0; i < TextArray.length; i++) {
    if (TextArray[i].id == toggleTaskId) {
      TextArray[i].completed == false
        ? (TextArray[i].completed = true)
        : (TextArray[i].completed = false);
    }
  }
  addTasksToLocalStorage(TextArray);
};
Delete.addEventListener("click", () => {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks");
});
