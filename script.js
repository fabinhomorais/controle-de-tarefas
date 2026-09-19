const taskList = document.getElementById("task-list");
const addButton = document.getElementById("add-button");
const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority-input");
const categoryInput = document.getElementById("category-input");

const today = new Date();
document.getElementById("week").textContent = "Hoje é " + today.toLocaleDateString("pt-BR");

const tasks = [
  {
    category: "Trabalho",
    title: "Cotação João - Recife/Gramado",
    time: "30 min",
    priority: "high",
    done: false
  },
  {
    category: "Pessoal",
    title: "Estudar Inglês",
    time: "10 min",
    priority: "low",
    done: false
  },
  {
    category: "Pessoal",
    title: "Controle de Tarefa",
    time: "90 min",
    priority: "medium",
    done: false
  }
];

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
        <span class="priority ${info.className}">${info.label}</span>
      </div>
    `;
  });

  const taskCards = document.querySelectorAll(".task");

  taskCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const index = card.dataset.index;
      tasks[index].done = !tasks[index].done;
      renderTasks();
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
    done: false
  };

  tasks.push(newTask);
  
  renderTasks();

  taskInput.value = "";
});