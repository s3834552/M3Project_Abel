"use strict";

console.log("TodoIt");

// State
var todoList = [];

// DOM Elements
var todoInput = document.getElementById('todoInput');
var todoListDiv = document.getElementById('todoListContainer');

function addTodo() {
    if (todoInput == null) {
        console.error('The todo input is missing from the page!');
        return;
    }
    var newTodo = todoInput.value;
    if ('' !== newTodo.trim()) {
        console.log('Adding todo: ', newTodo);
        todoList.push(newTodo);
        todoInput.value = '';
    }
    todoList.sort();
    updateTodoList();
    filterTodoList();
}

function updateTodoList() {
    console.log("Updating the rendered todo list");
    todoListDiv.innerHTML = '';
    
    if (todoList.length === 0) {
        todoListDiv.textContent = 'Nothing to do, hurray!';
        return;
    }

    var ul = document.createElement('ul');
    ul.setAttribute('id', 'todoList');
    todoListDiv.appendChild(ul);

    todoList.forEach(function (item) {
        var li = document.createElement('li');
        li.setAttribute('class', 'todo-list-item');
        // This links the click event back to our removal function
        li.innerHTML = "<a href='#' onclick='removeTodoListItem(\"" + item + "\")'>" + item + "</a>";
        ul.appendChild(li);
    });
}

function filterTodoList() {
    var todoListHtml = document.getElementById('todoList');
    if (todoListHtml === null) return;

    var todoListFilter = document.getElementById('todoFilter');
    if (!todoListFilter) return;

    var todoListFilterText = todoListFilter.value.toUpperCase();

    todoListHtml.childNodes.forEach(function (item) {
        var itemText = item.textContent;
        if (itemText !== null) {
            itemText = itemText.toUpperCase();
            item.style.display = itemText.startsWith(todoListFilterText) ? "list-item" : "none";
        }
    });
}

function removeTodoListItem(itemToRemove) {
    console.log("item to remove: ", itemToRemove);
    todoList = todoList.filter(function (value) { return value !== itemToRemove; });
    updateTodoList();
    filterTodoList();
}

window.addTodo = addTodo;
window.filterTodoList = filterTodoList;
window.removeTodoListItem = removeTodoListItem;