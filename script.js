document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const list = document.getElementById('task-list');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => addTask(task.text, task.completed, task.id));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        if (taskText !== '') {
            const taskId = Date.now();
            addTask(taskText, false, taskId);
            tasks.push({ text: taskText, completed: false, id: taskId });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            input.value = '';
        }
    });

    function addTask(text, completed, id) {
        const li = document.createElement('li');
        li.dataset.id = id; 

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;

        const span = document.createElement('span');
        span.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            const updatedTasks = tasks.filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        });

        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            const task = tasks.find(task => task.id === id);
            task.completed = checkbox.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        li.appendChild(checkbox);
        li.appendChild(deleteButton);
        li.appendChild(span);

        if (completed) {
            li.classList.add('completed');
        }

        list.appendChild(li);
    }
});
