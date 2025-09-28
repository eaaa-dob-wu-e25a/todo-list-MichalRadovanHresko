// todo3.js - DOM manipulation scaffolded, focus on JS logic

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  // Create and insert the clear completed button
  const clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear Completed';
  clearBtn.className = 'clear-btn';
  clearBtn.style.display = 'none';
  form.parentNode.insertBefore(clearBtn, list);

  // Counter elements (already created for you)
  const todoCount = document.createElement('div');
  todoCount.className = 'todo-count';
  form.parentNode.insertBefore(todoCount, list);

  const completedCount = document.createElement('div');
  completedCount.className = 'completed-count';
  form.parentNode.insertBefore(completedCount, list);

  // Add a button for toggling all complete
  const toggleAllBtn = document.createElement('button');
  toggleAllBtn.textContent = 'Toggle All Complete';
  toggleAllBtn.className = 'toggle-all-btn';
  form.parentNode.insertBefore(toggleAllBtn, list);
  toggleAllBtn.addEventListener('click', function() {
    toggleAllComplete();
    updateClearButton();
    updateAllCounters();
  });

  // Event: Add todo
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const task = input.value.trim();
    if (task) {
        //list.innerText += task; first implementation 
        addTodo(task);
    }
    updateAllCounters();
  }); 

  // Event: Clear completed
  clearBtn.addEventListener('click', function() {
    clearCompleted();
    updateClearButton();
    updateAllCounters();
  });

  // Add a todo item to the list
  function addTodo(task) {
    // DOM is handled for you:
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task;
    taskText.className = 'task-text';
    li.appendChild(taskText);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    li.appendChild(delBtn);
    list.appendChild(li);

    // Event: Mark as complete
    taskText.addEventListener('click', function() {
      markAsComplete(li);
      updateClearButton();
      updateAllCounters();
    });
    // Event: Delete
    delBtn.onclick = function() {
      list.removeChild(li);
      updateClearButton();
      updateAllCounters();
    };
    // Event: Edit
    taskText.ondblclick = function() {
      editTodo(li);
    };
  }

  // Mark a todo item as completed
  function markAsComplete(todoItem) {
    if (todoItem.classList.contains('completed')) {
      todoItem.classList.remove('completed');
    } else {
      todoItem.classList.add('completed');
    }
  }

  // Remove all completed tasks from the list
  function clearCompleted() {
    for (let i = list.children.length - 1; i >= 0; i--) {
      const todoItem = list.children[i];
      if (todoItem.classList.contains('completed')) {
        list.removeChild(todoItem);
      }
    }
  }

  // Show/hide the clear completed button
  function updateClearButton() {
    const completedItems = list.querySelectorAll('.completed');
    clearBtn.style.display = completedItems.length > 0 ? 'block' : 'none';
  }

  // Call update counters whenever the list changes
  function updateAllCounters() {
    updateTodoCount();
    updateCompletedCount();
    updateNoTodosMessage();
  }

  // Count and display the number of todos
  function updateTodoCount() {
    let x = 0;
    for (let i = 0; i < list.children.length; i++) {
      x++;
    }
    todoCount.textContent = 'Todos: ' + x;
  }

  // Count and display the number of completed todos
  function updateCompletedCount() {
    let y = 0;
    for (let i = 0; i < list.children.length; i++) {
      if (list.children[i].classList.contains('completed')) {
        y++;
      }
    }
    completedCount.textContent = 'Completed: ' + y;
  }

  // Show a message if there are no todos left
  function updateNoTodosMessage() {
    // Check if there are no todos (use === for comparison, not =)
    if (list.children.length === 0) {
      const noTask = document.createElement('p');
      noTask.textContent = 'There are no tasks left!';
      noTask.className = 'noTask-text';
      list.appendChild(noTask); 
    }
  }

  /**
   * Edits the text of a todo item
   * @param {HTMLElement} todoItem - The todo item to edit
   */
  function editTodo(todoItem) {
    const taskText = todoItem.querySelector('.task-text');
    const currentText = taskText.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    todoItem.replaceChild(input, taskText);
    input.focus();
    input.select();
    

    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const newText = input.value.trim();
        if (newText) {
          const newTaskText = document.createElement('span');
          newTaskText.textContent = newText;
          newTaskText.className = 'task-text';
          todoItem.replaceChild(newTaskText, input);
          
          newTaskText.addEventListener('click', function() {
            markAsComplete(todoItem);
            updateClearButton();
            updateAllCounters();
          });
          newTaskText.ondblclick = function() {
            editTodo(todoItem);
          };
        } else {
          todoItem.replaceChild(taskText, input);
        }
      }
    });
    
    input.addEventListener('blur', function() {
      const newText = input.value.trim();
      if (newText) {
        const newTaskText = document.createElement('span');
        newTaskText.textContent = newText;
        newTaskText.className = 'task-text';
        todoItem.replaceChild(newTaskText, input);
        
        newTaskText.addEventListener('click', function() {
          markAsComplete(todoItem);
          updateClearButton();
          updateAllCounters();
        });
        newTaskText.ondblclick = function() {
          editTodo(todoItem);
        };
      } else {
        todoItem.replaceChild(taskText, input);
      }
    });
  }

  function toggleAllComplete() {
    let allCompleted = true;
    for (let i = 0; i < list.children.length; i++) {
      const todoItem = list.children[i];
      if (!todoItem.classList.contains('noTask-text')) {
        if (!todoItem.classList.contains('completed')) {
          allCompleted = false;
          break;
        }
      }
    }
    for (let i = 0; i < list.children.length; i++) {
      const todoItem = list.children[i];
      if (!todoItem.classList.contains('noTask-text')) {
        if (allCompleted) {
          todoItem.classList.remove('completed');
        } else {
          todoItem.classList.add('completed');
        }
      }
    }
  }
});
