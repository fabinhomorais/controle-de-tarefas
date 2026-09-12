const today = new Date();
document.getElementById("week").textContent = "Hoje é " + today.toLocaleDateString("pt-BR");

const task = {
  category: "Trabalho",
  title: "Cotação João — Recife/Gramado",
  time: "30 min",
  priority: "high"
};


const taskList = document.getElementById("task-list");

taskList.innerHTML = `
  <div class="task">
    <p class="task-category">${task.category}</p>
    <p class="task-tittle">${task.title}</p>
    <p class="task-time">${task.time}</p>
    <span class="priority priority-high">${task.priority}</span>
  </div>
`;