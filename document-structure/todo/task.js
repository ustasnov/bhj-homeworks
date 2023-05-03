const addButton = document.getElementById("tasks__add");
const inputElement = document.getElementById("task__input");
const taskList = document.getElementById("tasks__list");
const tasks = [];

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
    taskElement.remove();
    event.preventDefault();
  })
}

function addTask(taskText) {
  if (taskText !== "") {
    tasks.push(taskText);
    addTaskElement(taskText);
  }
}

inputElement.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    addTask(inputElement.value.trim());
    event.preventDefault();
  }
});

addButton.addEventListener("click", event => {
  addTask(inputElement.value.trim());
  event.preventDefault();
});


