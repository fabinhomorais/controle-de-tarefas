const today = new Date();
document.getElementById("week").textContent = "Hoje é " + today.toLocaleDateString("pt-BR");

const task = {
  category: "Trabalho",
  title: "Cotação João — Recife/Gramado",
  time: "30 min",
  priority: "high"
};

const message =  `A tarefa é: ${task.title}`;
console.log(message);