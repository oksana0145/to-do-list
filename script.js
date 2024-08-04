document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const list = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

        const span = document.createElement('span');
        span.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.classList.add('delete');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = completed;

        deleteButton.addEventListener('click', () => {
            list.removeChild(li);
            tasks = tasks.filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed', checkbox.checked);
            const task = tasks.find(task => task.id === id);
            if (task) {
                task.completed = checkbox.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });

        span.addEventListener('dblclick', () => {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            input.classList.add('editing');
            li.replaceChild(input, span);
            input.focus();

            input.addEventListener('blur', () => {
                span.textContent = input.value;
                li.replaceChild(span, input);
                const task = tasks.find(task => task.id === id);
                if (task) {
                    task.text = input.value;
                    localStorage.setItem('tasks', JSON.stringify(tasks));
                }
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
            });
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        li.appendChild(checkbox);

        if (completed) {
            li.classList.add('completed');
        }

        list.appendChild(li);
    }
});
