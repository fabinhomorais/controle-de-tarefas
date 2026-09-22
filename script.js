const taskList = document.getElementById("task-list");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority-input");
const categoryInput = document.getElementById("category-input");
const deadlineInput = document.getElementById("deadline-input");

const today = new Date();
document.getElementById("week").textContent = "Hoje é " + today.toLocaleDateString("pt-BR");

let daysToMonday = today.getDay() - 1;

if (daysToMonday < 0) {
  daysToMonday = 6;
}

const monday = new Date(today)
monday.setDate(today.getDate() - daysToMonday);

const sunday = new Date(monday);
sunday.setDate(monday.getDate() + 6);

const mondayText = monday.toLocaleDateString("pt-BR");
const sundayText = sunday.toLocaleDateString("pt-BR");

document.getElementById("week").textContent = "Semana de " + mondayText + " a " + sundayText;

const savedTasks = localStorage.getItem("tasks");

let tasks;

if (savedTasks) {
  tasks = JSON.parse(savedTasks);
} else {
  tasks = [];
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDeadline(deadline) {
  if (!deadline) {
    return "Sem prazo";
  }

  const date = new Date(deadline + "T00:00:00");
  return "Prazo: " + date.toLocaleDateString("pt-BR");
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const priorityInfo = {
      high:   { label: "Alta",  className: "priority-high" },
      medium: { label: "Média", className: "priority-medium" },
      low:    { label: "Baixa", className: "priority-low" }
    };
    
    const info = priorityInfo[task.priority];

    let doneClass = "";
    if (task.done === true) {
      doneClass = "task-done";
    }

    taskList.innerHTML += `
      <div class="task ${doneClass}" data-index="${index}">
        <p class="task-category">${task.category}</p>
        <p class="task-title">${task.title}</p>
        <p class="task-time">${task.time}</p>
        <p class="task-deadline">${formatDeadline(task.deadline)}</p>
        <span class="priority ${info.className}">${info.label}</span>
        <button class="delete-button" data-index="${index}">x</button>
      </div>
    `;
  });

  const taskCards = document.querySelectorAll(".task");
  taskCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const index = card.dataset.index;
      tasks[index].done = !tasks[index].done;
      renderTasks();
      saveTasks();
    });
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const index = button.dataset.index;
      tasks.splice(index, 1);
      renderTasks();
      saveTasks();
    });
  });
}

renderTasks();

addButton.addEventListener("click", function () {
  const newTaskText = taskInput.value.trim();

  if (newTaskText === "") {
    return;
  }

  const newTask = {
    category: categoryInput.value,
    title: newTaskText,
    time: "",
    priority: priorityInput.value,
    deadline: deadlineInput.value,
    done: false
  };

  tasks.push(newTask);
  
  renderTasks();
  saveTasks();
  taskInput.value = "";
});