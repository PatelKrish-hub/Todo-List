// select dom Elements

// const { createElement } = require("react");

const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// Try to load saved todos from localStorage (if any)

const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];



function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}



function CreateTodoNode(todo, index) {
    const li = document.createElement('li');
    // checkbox toggle completion
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = !!todo.completed;
    checkBox.addEventListener("change", () => {
        todo.completed = checkBox.checked;

        // TODO: Visual feedback: strike-through when completed

        textSpan.style.textDecoration = todo.completed? 'line-through': "";
        saveTodos();

    });

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through'; 
    }
        textSpan.addEventListener("dblclick", ()=>{
            const newText = prompt("Edit todo", todo.text);
            if (newText !== null) {
                todo.text = newText.trim()
                textSpan.textContent = todo.text;
                saveTodos()
            }
        })

       const delBtn = document.createElement('button');
       delBtn.textContent = "Delete";
       delBtn.addEventListener('click', ()=>{
        todos.splice(index, 1);
        render();
        saveTodos();

       })

       li.appendChild(checkBox);
       li.appendChild(textSpan);
       li.appendChild(delBtn);
       return li;
}


function render() {
    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const node = CreateTodoNode(todo, index);
        // console.log(node, todo)
        list.appendChild(node)
    });
}


function addTodo() {
    const text =input.value.trim();
    if (!text) {
        return
    }

    todos.push({text, completed: false});
    input.value = '';
    render();
    saveTodos();
}


addBtn.addEventListener("click", addTodo);
render();

input.addEventListener('keydown', (e)=>{
    if (e.key == 'Enter') {
        addTodo();
    }
})
render();



alert("Welcome To Todos App, Double Click To Edit Todo");

