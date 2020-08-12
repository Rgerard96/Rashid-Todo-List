const myDate = document.querySelector('.date');
const numTask = document.querySelector('.numTask');
const itemTasks = document.querySelectorAll('.item-tasks');
const taskInput = document.querySelector('#task-input');
const enterBtn = document.querySelector('.enter-btn');
const tasks = document.querySelector('.tasks');
const navItem2 = document.querySelector('.nav-item2');

let todayDate = new Date();
let todayDateString = todayDate.toDateString();

myDate.innerHTML = todayDateString;

let task;
let firstSection;
let text;
let circle;
let trash;
let faTrash;
let faCircle;
let activeTasks = tasks.children;

document.addEventListener('DOMContentLoaded', getTodos);
document.addEventListener('DOMContentLoaded', getTasks);
enterBtn.addEventListener('click', addTodo);
tasks.addEventListener('click', removeTodo);
tasks.addEventListener('click', checkCompleted);

itemTasks.forEach((item, index, arr) => {
  item.addEventListener('click', () =>{
    for (let i = 0; i < arr.length; i++) {
      arr[i].classList.remove('active');
      item.classList.add('active');
      console.log(item.className);
      if (item.className == 'item-tasks all-tasks active') {
        for (let k = 0; k < activeTasks.length; k++) {
          activeTasks[k].style.display = 'flex';
        }
      } else if (item.className == 'item-tasks incomplete-tasks active') {
        for (let k = 0; k < activeTasks.length; k++) {
          if (activeTasks[k].className == 'task active-task') {
            activeTasks[k].style.display = 'flex';
          } else{
            activeTasks[k].style.display = 'none';
          }
        }
      } else if (item.className == 'item-tasks completed-tasks active') {
        for (let k = 0; k < activeTasks.length; k++) {
          if (activeTasks[k].className == 'task') {
            activeTasks[k].style.display = 'flex';
          } else{
            activeTasks[k].style.display = 'none';
          }
        }
      }
    } 
  });
});


function addTodo(event){
  event.preventDefault();
  if (taskInput.value.length == 0) {
    taskInput.setAttribute('placeholder', 'Enter a task...');
  } else {
    task = document.createElement('DIV');
    task.classList.add('task');
    task.classList.add('active-task');
    firstSection = document.createElement('DIV');
    firstSection.classList.add('firstSection');
    circle = document.createElement('div');
    circle.setAttribute('class', 'circle');
    circle.innerHTML = '<i class="far fa-circle"></i>';
    text = document.createElement('P');
    text.classList.add('text');
    text.innerHTML = taskInput.value;
    trash = document.createElement('DIV');
    trash.setAttribute('class', 'trash');
    trash.innerHTML = '<i class="far fa-trash-alt"></i>';
    
    tasks.appendChild(task);
    task.appendChild(firstSection);
    firstSection.appendChild(circle);
    firstSection.appendChild(text);
    task.appendChild(trash);
    saveTodos(taskInput.value);
    taskInput.value = '';

  }

  getTasks();
}

function removeTodo(event){
  let todos;
  let x = event.target;
  let mine = x.parentElement.parentElement.children[0].children[1].innerText;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    let z = todos.indexOf(mine);
    todos.splice(z, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  if (x.classList[1] === 'fa-trash-alt') {
    const b = x.parentElement.parentElement;
    b.remove();
    todos = JSON.parse(localStorage.getItem('todos'));
  }
}

function checkCompleted(event) {
  let x = event.target;
  if (x.classList[1] === 'fa-circle') {
    const y = x.parentElement.nextElementSibling;
    y.classList.add('text-completed');
    x.classList.remove('fa-circle');
    x.classList.add('fa-check-circle');
    x.parentElement.parentElement.parentElement.classList.remove('active-task');
  } else if (x.classList[1] === 'fa-check-circle') {
    const y = x.parentElement.nextElementSibling;
    y.classList.remove('text-completed');
    x.classList.add('fa-circle');
    x.classList.remove('fa-check-circle');
    x.parentElement.parentElement.parentElement.classList.add('active-task');
  }
 getTasks();
}



function getTasks() {
  let x = 0;
  for (let i = 0; i < activeTasks.length; i++) {
    if (activeTasks[i].className == 'task active-task') {
      x++;
    }
  }
  numTask.innerHTML = x + ' Active Tasks';
}


function saveTodos(addTodo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(addTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(addTodo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(addTodo){
    task = document.createElement('DIV');
    task.classList.add('task');
    task.classList.add('active-task');
    firstSection = document.createElement('DIV');
    firstSection.classList.add('firstSection');
    circle = document.createElement('div');
    circle.setAttribute('class', 'circle');
    circle.innerHTML = '<i class="far fa-circle"></i>';
    text = document.createElement('P');
    text.classList.add('text');
    text.innerHTML = addTodo;
    trash = document.createElement('DIV');
    trash.setAttribute('class', 'trash');
    trash.innerHTML = '<i class="far fa-trash-alt"></i>';
    
    tasks.appendChild(task);
    task.appendChild(firstSection);
    firstSection.appendChild(circle);
    firstSection.appendChild(text);
    task.appendChild(trash);
  });
}