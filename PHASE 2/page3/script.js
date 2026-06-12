// ======================================
// ELEMENT SELECT
// ======================================

let taskInput = document.getElementById("taskInput");

let addTaskBtn = document.getElementById("addTask");

let taskList = document.getElementById("taskList");

// ======================================
// LOCAL STORAGE
// ======================================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ======================================
// RENDER TASK FUNCTION
// ======================================

function createTask(task) {

  let li = document.createElement("li");

  li.textContent = task;

  // DONE FEATURE
  li.addEventListener("click", function () {

    li.classList.toggle("done");

  });

  // DELETE BUTTON
  let deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Delete";

  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function (e) {

    e.stopPropagation();

    li.remove();

    tasks = tasks.filter(t => t !== task);

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  });

  li.appendChild(deleteBtn);

  taskList.appendChild(li);

}

// ======================================
// LOAD SAVED TASKS
// ======================================

tasks.forEach(function(task){

  createTask(task);

});

// ======================================
// ADD TASK EVENT
// ======================================

addTaskBtn.addEventListener("click", function () {

  let task = taskInput.value;

  if (task.trim() === "") {

    alert("Please enter a task");

    return;

  }

  createTask(task);

  tasks.push(task);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  taskInput.value = "";

});