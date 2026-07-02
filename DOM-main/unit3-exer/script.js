
let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addBtn");
let taskList = document.getElementById("taskList");
let taskCount = document.getElementById("taskCount");

// STEP 2: ARRAY
let tasks = [];
let filteredTasks = [];
let currentFilter = "All";

//STEP 11: LOCAL STORAGE
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  applyFilter();
}

// STEP 6: TOGGLE TASK
function toggleTask(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
  );

  saveTasks();
  applyFilter();
}

//STEP 7: DELETE TASK
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);

  saveTasks();
  applyFilter();
}

// STEP 9: TASK COUNTER 
function updateTaskCount() {
  let activeTasks = tasks.filter(task => !task.completed);
  taskCount.textContent = activeTasks.length + " tasks left";
}

// STEP 10: FILTER
function applyFilter() {
  if (currentFilter === "Active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } 
  else if (currentFilter === "Completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } 
  else {
    filteredTasks = [...tasks];
  }

  showTasks();
  updateTaskCount();
}

// STEP 4: SHOW TASKS 
function showTasks() {

  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "<li>Your to-do list is empty</li>";
    return;
  }

  filteredTasks.forEach(task => {

    let li = document.createElement("li");

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
    });

    // Text
    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}
function addTask() {
  let taskText = taskInput.value.trim();

  if (taskText.trim() === "") {
    alert("Please enter a task");
    return;
  }

  let taskObj = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(taskObj);

  taskInput.value = "";

  saveTasks();
  applyFilter();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown",function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});
document.getElementById("allBtn").addEventListener("click", () => {
  currentFilter = "All";
  applyFilter();
});

document.getElementById("activeBtn").addEventListener("click", () => {
  currentFilter = "Active";
  applyFilter();
});

document.getElementById("completedBtn").addEventListener("click", () => {
  currentFilter = "Completed";
  applyFilter();
});
document.getElementById("clearCompletedBtn").addEventListener("click", () => {
  tasks = tasks.filter(task => !task.completed);

  saveTasks();
  applyFilter();
});
document.getElementById("markAllBtn").addEventListener("click", () => {
  tasks = tasks.map(task => ({ ...task, completed: true }));

  saveTasks();
  applyFilter();
});
document.addEventListener("DOMContentLoaded", loadTasks);