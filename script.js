function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>
        <div class="task-buttons d-flex">
            <button class="btn btn-sm btn-outline-primary me-2" onclick="editTask(this)">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="removeTask(this)">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    updateTaskCount();
}

function removeTask(element) {
    element.closest(".list-group-item").remove();
    updateTaskCount();
}

function editTask(element) {
    let taskText = element.closest(".list-group-item").querySelector(".task-text");
    let newTask = prompt("Edit your task:", taskText.innerText);

    if (newTask !== null && newTask.trim() !== "") {
        taskText.innerText = newTask;
    }
}

function updateTaskCount() {
    let taskList = document.getElementById("taskList");
    let taskCount = document.getElementById("taskCount");
    taskCount.innerText = taskList.children.length;
}
