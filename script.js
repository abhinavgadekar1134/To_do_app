function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
        <span class="task-text">${taskInput.value}</span>
        <div class="task-buttons">
            <button class="edit-btn" onclick="editTask(this)">✏️</button>
            <button class="delete-btn" onclick="removeTask(this)">🗑️</button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    updateTaskCount();
}

function removeTask(element) {
    element.parentElement.parentElement.remove();
    updateTaskCount();
}

function editTask(element) {
    let taskText = element.parentElement.previousElementSibling;
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
