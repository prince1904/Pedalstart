// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:5000/api/tasks');
        const tasks = await response.json();
        renderTasks(tasks);
    };

    const renderTasks = (tasks) => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate}</p>
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="editTask(${task.id})">Edit</button>
            `;
            taskList.appendChild(taskItem);
        });
    };

    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;

        await fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, dueDate })
        });

        taskForm.reset();
        fetchTasks();
    });

    window.deleteTask = async (id) => {
        await fetch(`http://localhost:5000/api/tasks/${id}`, {
            method: 'DELETE'
        });
        fetchTasks();
    };

    window.editTask = (id) => {
        // Implement edit functionality
    };

    fetchTasks();
});
