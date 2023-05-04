const addButton = document.getElementById("tasks__add");
const inputElement = document.getElementById("task__input");
const taskList = document.getElementById("tasks__list");
let tasks = [];

function fillTasks() {
  tasks.forEach(element => {
    addTaskElement(element);  
  });
}

function loadTasksData() {
  const tasksData = localStorage.getItem("tasksData");
  if (tasksData) {
    tasks = JSON.parse(tasksData);
    fillTasks();
  }
}

function saveTasksData() {
  if (tasks.length > 0) {
    const tasksData = JSON.stringify(tasks);
    try {
      localStorage.setItem("tasksData", tasksData);
    } catch (e) {
      if (e == QUOTA_EXCEEDED_ERR) {
        console.log('Превышен лимит выделенного пространства для локального хранилища!');
      }
    }
  } else {
    localStorage.removeItem("tasksData");
  }
}

function addTaskElement(taskText) {
  let taskElementText =
    `<div class="task">
      <div class="task__title">
        ${taskText}
      </div>
      <a href="#" class="task__remove">&times;</a>
    </div>`;
  taskList.insertAdjacentHTML("beforeEnd", taskElementText);
  const removeButtons = Array.from(taskList.querySelectorAll(".task__remove"));
  const removeButton = removeButtons[removeButtons.length - 1];

  removeButton.addEventListener('click', event => {
    const taskElement = event.currentTarget.closest(".task");
    const taskIndex = Array.from(taskList.querySelectorAll(".task")).indexOf(taskElement);
    if (taskIndex >= 0) {
      tasks.splice(taskIndex, 1);
    }
    taskElement.remove();
    saveTasksData();
    event.preventDefault();
  });
}

function addTask(inputElement) {
  const taskText = inputElement.value.trim();
  if (taskText !== "") {
    tasks.push(taskText);
    addTaskElement(taskText);
    saveTasksData();
    inputElement.value = "";
  }
}

inputElement.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTask(inputElement);
    event.preventDefault();
  }
});

addButton.addEventListener("click", event => {
  addTask(inputElement);
  event.preventDefault();
});

loadTasksData();

