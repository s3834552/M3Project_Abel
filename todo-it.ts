"use strict";

console.log("TodoIt");

// Use 'let' instead of 'const' because we reassign this array when removing items
let todoList: string[] = [];

// Grab DOM elements
const todoInput: HTMLInputElement = document.getElementById('todoInput') as HTMLInputElement;
const todoListDiv: HTMLDivElement = document.getElementById('todoListContainer') as HTMLDivElement;

/**
 * Adds a new item from the input field to the list
 */
function addTodo(): void { 
    if (todoInput == null) { 
        console.error('The todo input is missing from the page!'); 
        return; 
    } 

    const newTodo: string = todoInput.value; 

    if ('' !== newTodo.trim()) { 
        console.log('Adding todo: ', newTodo);

        todoList.push(newTodo); 
        console.log('New todo list: ', todoList); 

        todoInput.value = ''; 
    }

    // Keep the list sorted alphabetically
    todoList.sort(); 

    // Update the visual list
    updateTodoList(); 

    // Re-apply filter in case the user is currently searching
    filterTodoList(); 
}

/**
 * Re-renders the entire <ul> list based on the todoList array
 */
function updateTodoList(): void { 
    console.log("Updating the rendered todo list"); 
    
    // Clear the container
    todoListDiv.innerHTML = ''; 

    if (todoList.length === 0) {
        todoListDiv.textContent = 'Nothing to do, hurray!';
        return;
    }

    const ul = document.createElement('ul'); 
    ul.setAttribute('id', 'todoList'); 
    todoListDiv.appendChild(ul); 

    todoList.forEach(item => { 
        const li = document.createElement('li'); 
        li.setAttribute('class', 'todo-list-item'); 
        
        // Use backticks (`) for template literals to inject the ${item} variable
        li.innerHTML = `<a href='#' onclick='removeTodoListItem("${item}")'>${item}</a>`; 
        ul.appendChild(li); 
    }); 
} 

/**
 * Filters the visible <li> elements based on the filter input
 */
function filterTodoList(): void { 
    console.log("Filtering the rendered todo list"); 

    const todoListHtml = document.getElementById('todoList') as HTMLUListElement; 

    if (todoListHtml === null) { 
        console.log("Nothing to filter"); 
        return; 
    } 

    const todoListFilter = document.getElementById('todoFilter') as HTMLInputElement; 
    
    // Handle case where filter input might not exist yet
    if (!todoListFilter) return;

    const todoListFilterText = todoListFilter.value.toUpperCase(); 

    todoListHtml.childNodes.forEach((item) => { 
        let itemText: string | null = item.textContent; 
        if (itemText !== null) { 
            itemText = itemText.toUpperCase(); 

            // Show item if it starts with the filter text, otherwise hide it
            if (itemText.startsWith(todoListFilterText)) { 
                (item as HTMLLIElement).style.display = "list-item"; 
            } else { 
                (item as HTMLLIElement).style.display = "none"; 
            } 
        } 
    }); 
} 

/**
 * Removes a specific item and refreshes the UI
 */
function removeTodoListItem(itemToRemove: string): void { 
    console.log("item to remove: ", itemToRemove); 

    // Filter creates a new array excluding the item to remove
    todoList = todoList.filter((value: string) => value !== itemToRemove); 

    updateTodoList(); 
    filterTodoList(); 
}