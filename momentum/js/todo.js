const todoInput = document.getElementById('todo-input');
const inputBox = document.querySelector('#input-box');
const inputBtn = document.querySelector('#input-btn');
const todoList = document.getElementById('todo-list');

const todoItems = [];

function deleteTodo(event) {
  const item = this.parentElement;
  item.remove();
}

function paintTodo(inputValue) {
  if (inputValue.length > 0) {
    const itemList = document.createElement('li');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    const item = document.createElement('span');
    item.innerHTML = inputValue;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '❎';
    deleteBtn.addEventListener('click', deleteTodo);

    itemList.appendChild(checkBox);
    itemList.appendChild(item);
    itemList.appendChild(deleteBtn);
    todoList.appendChild(itemList);
  }
}

function getTodoInput(event) {
  event.preventDefault();
  const inputValue = inputBox.value;
  inputBox.value = '';
  paintTodo(inputValue);
}

todoInput.addEventListener('submit', getTodoInput);
