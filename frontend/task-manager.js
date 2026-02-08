const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";

  tasks
    .filter(t => {
      if (currentFilter === "active") return !t.done;
      if (currentFilter === "done") return t.done;
      return true;
    })
    .forEach((task, i) => {
      const li = document.createElement("li");
      li.className = "task" + (task.done ? " done" : "");

      li.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
          <button onclick="toggle(${i})">✓</button>
          <button onclick="removeTask(${i})">✕</button>
        </div>
      `;

      list.appendChild(li);
    });
}

function addTask() {
  if (!input.value.trim()) return;

  tasks.push({
    text: input.value,
    done: false
  });

  input.value = "";
  save();
  render();
}

function toggle(i) {
  tasks[i].done = !tasks[i].done;
  save();
  render();
}

function removeTask(i) {
  tasks.splice(i, 1);
  save();
  render();
}

addBtn.onclick = addTask;

input.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

filters.forEach(btn => {
  btn.onclick = () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  };
});

render();
