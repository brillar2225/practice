const todoInput = document.getElementById('todo-input');
const inputBox = document.querySelector('#input-box');
const inputBtn = document.querySelector('#input-btn');
const todoList = document.getElementById('todo-list');

const TODOS_KEY = 'todoItems';

let todoItems = [];

// Save input value to localStorage
function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoItems));
}

// Delete lists
function deleteTodo(event) {
  const item = this.parentElement;
  todoItems = todoItems.filter((todoItem) => todoItem.id !== parseInt(item.id));
  item.remove();
  saveTodos();
}

// Show lists
function paintTodo(inputValue) {
  const itemList = document.createElement('li');
  itemList.id = inputValue.id;
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  const item = document.createElement('span');
  item.innerHTML = inputValue.text;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '❎';
  deleteBtn.addEventListener('click', deleteTodo);

  itemList.appendChild(checkBox);
  itemList.appendChild(item);
  itemList.appendChild(deleteBtn);
  todoList.appendChild(itemList);
}

// Get input value
function getTodoInput(event) {
  event.preventDefault();
  const inputValue = inputBox.value;
  inputBox.value = '';
  const todoItemObj = {
    text: inputValue,
    id: Date.now(),
  };
  todoItems.push(todoItemObj);
  // Call paintTodo and saveTodo function
  paintTodo(todoItemObj);
  saveTodos();
}

todoInput.addEventListener('submit', getTodoInput);

// Get key value from localStorage
const savedTodos = localStorage.getItem(TODOS_KEY);
// Parse key value stringified and Excute paintTodo function for each value
if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todoItems = parsedTodos;
  parsedTodos.forEach(paintTodo);
}
