const toDoform = document.querySelector('.js-todoform'),
  toDoinput = document.querySelector('.js-todo-input'),
  toDolist = document.querySelector('.js-toDolist');

const TODOS_LS = 'toDos';

let toDos = [];

function something(toDo) {
  showToDos(toDo.name);
}




function loadToDos() {
  const loaded_todos = localStorage.getItem(TODOS_LS);
  if (loaded_todos !== null) {
    const parsedToDos = JSON.parse(loaded_todos);
    parsedToDos.forEach(something);
  }
}


function saveTodos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDolist.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveTodos();
}


function showToDos(text) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerText = text;
  const delBtn = document.createElement('button');
  delBtn.innerHTML = '❌';
  delBtn.addEventListener('click', deleteToDo)
  const newId = toDos.length + 1;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDolist.appendChild(li);
  const toDoObject = {
    name: text,
    id: newId,
  }
  toDos.push(toDoObject);
  saveTodos();
}

function submitHandler(event) {
  event.preventDefault();
  const currentValue = toDoinput.value;
  showToDos(currentValue);
  toDoinput.value = "";
}

function init() {
  loadToDos();

  toDoform.addEventListener('submit', submitHandler);
}

init();