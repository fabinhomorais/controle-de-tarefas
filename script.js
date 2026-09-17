const taskList = document.getElementById("task-list");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");

const today = new Date();
document.getElementById("week").textContent = "Hoje é " + today.toLocaleDateString("pt-BR");

const tasks = [
  {
    category: "Trabalho",
    title: "Cotação João - Recife/Gramado",
    time: "30 min",
    priority: "high"
  },
  {
    category: "Pessoal",
    title: "Estudar Inglês",
    time: "10 min",
    priority: "low"
  },
  {
    category: "Pessoal",
    title: "Controle de Tarefa",
    time: "90 min",
    priority: "medium"
  }
];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const priorityInfo = {
      high:   { label: "Alta",  className: "priority-high" },
      medium: { label: "Média", className: "priority-medium" },
      low:    { label: "Baixa", className: "priority-low" }
    };

    const info = priorityInfo[task.priority];

    taskList.innerHTML += `
      <div class="task">
        <p class="task-category">${task.category}</p>
        <p class="task-title">${task.title}</p>
        <p class="task-time">${task.time}</p>
        <span class="priority ${info.className}">${info.label}</span>
      </div>
    `;
  });
}

renderTasks();

addButton.addEventListener("click", function () {
  const newTaskText = taskInput.value.trim();

  if (newTaskText === "") {
    return;
  }

  const newTask = {
    category: "Pessoal",
    title: newTaskText,
    time: "",
    priority: "medium"
  };

  tasks.push(newTask);
  
  renderTasks();

  taskInput.value = "";
});