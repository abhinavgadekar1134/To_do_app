let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
async function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");
    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }


    let li = document.createElement("li");
    li.className = "outer-group close-to-del list-group-item block justify-content-between align-items-center";
    li.innerHTML = `

        <span class="task-text">${taskInput.value}</span>
        <li class="task-buttons d-flex">
            <button class="btn btn-sm btn-outline-primary me-2" onclick="editTask(this)">
                <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="removeTask(this)">
                <i class="bi bi-trash"></i>
            </button>
        </li>

    `;
    taskList.appendChild(li);
    taskInput.value = "";
    updateTaskCount();

}



async function generateWithAI() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    // Create main task item
    let li = document.createElement("li");
    li.className = "close-to-del list-group-item d-flex justify-content-between align-items-center flex-column outer-group"; // Flex for proper alignment
    li.innerHTML = `
        <div class="d-flex w-100 justify-content-between align-items-center">
            <span class="task-text fw-bold">${taskInput.value}</span>
            <div class="task-buttons">
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editTask(this)">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeTask(this)">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `;

    try {
        // Fetch tasks from Groq API
        // Gorq api
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer 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",
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are task creator who generates array of string for task based on user query\nExample - User asks - I want to learn javascript\nresult - { 'tasks': ['Learn basic of variable', 'control flows', 'so on']} in json.  always use same format for result means only tasks in object   \n",
                        },
                        {
                            role: "user",
                            content: taskInput.value,
                        },
                    ],
                    model: "llama-3.3-70b-versatile",
                    temperature: 1,
                    max_completion_tokens: 1024,
                    top_p: 1,
                    stream: false,
                    response_format: {
                        type: "json_object",
                    },
                    stop: null,
                }),
            }
        );
        const body = await response.json();
        console.log(body.choices[0].message.content);
        const tasks = JSON.parse(body.choices[0].message.content).tasks;
        console.log(tasks);

        // Create ordered list for subtasks
        let ol = document.createElement("ol");
        ol.className = "mt-2 ps-3"; // Bootstrap padding for indentation

        tasks.forEach((task) => {
            let subLi = document.createElement("li");
            subLi.className = "close-to-del d-flex justify-content-between align-items-center";
            subLi.innerHTML = `
                <span class="task-text">${task}</span>
                <div class="task-buttons">
                    <button class="btn btn-sm btn-outline-primary me-2" onclick="editTask(this)">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeTask(this)">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
            ol.appendChild(subLi);
        });

        li.appendChild(ol);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to generate tasks. Please try again later.");
        return;
    }

    // Append to task list
    taskList.appendChild(li);
    taskInput.value = "";
    updateTaskCount();
}























function removeTask(element) {
    element.closest(".close-to-del").remove();
    updateTaskCount();
}

function editTask(element) {
    let taskText = element.closest(".close-to-del").querySelector(".task-text");
    
    // Create an input field with the same styling as text
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = taskText.innerText;
    inputField.className = "task-edit-input form-control border-0 p-0 m-0 bg-transparent";
    inputField.style.width = "100%";
    inputField.style.fontSize = "inherit";
    inputField.style.fontWeight = "inherit";
    inputField.style.outline = "none";
    
    // Replace task text with input field
    taskText.replaceWith(inputField);
    inputField.focus();
    
    // Save changes when input loses focus or Enter is pressed
    inputField.addEventListener("blur", () => saveEdit(inputField));
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            saveEdit(inputField);
        }
    });
}

function saveEdit(inputField) {
    let newText = inputField.value.trim();
    if (newText === "") return;
    
    let taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.innerText = newText;
    
    inputField.replaceWith(taskText);
}

function updateTaskCount() {
    let taskList = document.getElementById("taskList");
    let taskCount = document.getElementById("taskCount");
    taskCount.innerText = taskList.children.length;
}


async function getTasksFromGroq2() {
    const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer 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",
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content:
                            "You are task creator who generates array of string for task based on user query\nExample - User asks - I want to learn javascript\nresult - { 'tasks': ['Learn basic of variable', 'control flows', 'so on']} in json\n",
                    },
                    {
                        role: "user",
                        content: taskInput.value,
                    },
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 1,
                max_completion_tokens: 1024,
                top_p: 1,
                stream: false,
                response_format: {
                    type: "json_object",
                },
                stop: null,
            }),
        }
    );
    const body = await response.json();
    console.log(body.choices[0].message.content);
    const tasks = JSON.parse(body.choices[0].message.content).tasks;
    return tasks;
    tasks.forEach(element => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <span class="task-text">${element}</span>
            <li class="task-buttons d-flex">
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editTask(this)">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="removeTask(this)">
                    <i class="bi bi-trash"></i>
                </button>
            </li>
            
    `;

        taskList.appendChild(li);
    });
}
