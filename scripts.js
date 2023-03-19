const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const divNoneTasks = document.querySelector(".none-tasks");
const tasksContainer = document.querySelector(".tasks");

const countTasks = () => document.querySelectorAll(".task").length;
const countCompletedTasks = () => document.querySelectorAll(".task .checked").length;
const TasksAndCompletedTasks = () => countCompletedTasks();

/*
Fica observando mudanças no DOM e executa uma função quando isso correr.

var target = document.querySelector( '[data-js="div"]' );
var observer = new MutationObserver( handleMutationObserver );
var config = { childList: true, attributes: true };
  
function handleMutationObserver( mutations ) {
  mutations.forEach(function(mutation) {
    console.log( mutation.type );
  });
}
  
observer.observe( target, config );
*/

const target = document.querySelector(".tasks");
const observer = new MutationObserver(handleMutationObserver);
const config = { childList: true, attributes: true };

function handleMutationObserver(mutations) {
  if(countTasks() > 0){
    divNoneTasks.classList.add("display-none")
  } else {
    divNoneTasks.classList.remove("display-none")
  }
  console.log("ok" + countTasks())
  mutations.forEach(function () {
    const spanCountTasks = document.querySelector(".created-tasks span");
    spanCountTasks.innerText = countTasks();

    const spanCompletedTasks = document.querySelector(".completed-tasks span");
    spanCompletedTasks.innerText = TasksAndCompletedTasks();
  });
}

observer.observe(target, config);

// Verifica se o conteúdo do input tem tamanho maior que 0;
const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validateInput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task");

  const inputCheckedTask = document.createElement("input");
  inputCheckedTask.setAttribute("type", "checkbox");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  inputCheckedTask.addEventListener("change", () =>
    handleClick(taskContent, inputCheckedTask)
  );

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("fas");
  deleteItem.classList.add("fa-trash");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(inputCheckedTask, taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(inputCheckedTask);
  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  tasksContainer.appendChild(taskItemContainer);

  inputElement.value = "";
};

const handleClick = (taskContent, inputCheckedTask) => {
  const spanCompletedTasks = document.querySelector(".completed-tasks span");

  if (inputCheckedTask.checked) {
    taskContent.classList.add("checked");
    spanCompletedTasks.innerText = TasksAndCompletedTasks();
  } else {
    taskContent.classList.remove("checked");
    spanCompletedTasks.innerText = TasksAndCompletedTasks();
  }
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  taskContent.remove();
};

const handleInputChange = () => {
  const inputIsValid = validateInput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

addTaskButton.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());
