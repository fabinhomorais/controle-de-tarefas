const today = new Date();
document.getElementById("week").textContent = "Hoje é " + today.toLocaleDateString("pt-BR");

const task = {
  category: "Trabalho",
  title: "Cotação João — Recife/Gramado",
  time: "30 min",
  priority: "medium"
};

const priorityInfo = {
  high: { label: "Alta", className: "priority-high"},
  medium: { label: "Média", className: "priority-medium"},
  low: { label: "Baixa", className: "priority-low"}
};

const info = priorityInfo[task.priority];

const taskList = document.getElementById("task-list");

taskList.innerHTML = `
  <div class="task">
    <p class="task-category">${task.category}</p>
    <p class="task-tittle">${task.title}</p>
    <p class="task-time">${task.time}</p>
    <span class="priority ${info.className}">${info.label}</span>
  </div>
`;