
const form = document.querySelector('.js-form'),
  input = form.querySelector('.js-form__input'),
  greetings = document.querySelector('.js-hi');

const USER_LS = 'currentUsername',

  SHOW_CN = 'show';

function showGreeting(text) {
  greetings.innerText = `Привет, ${text}`;
  greetings.classList.add(SHOW_CN);
  form.classList.remove(SHOW_CN);
}

function saveUsername(text){
  localStorage.setItem(USER_LS, text);
}


function submitHandler(event) {
  event.preventDefault();
  const inputValue = input.value;
  showGreeting(inputValue);
  saveUsername(inputValue);
}

function askForUsername() {
  form.classList.add(SHOW_CN);
  form.addEventListener('submit', submitHandler)
}


function loadUsername() {
  const currentUsername = localStorage.getItem(USER_LS);
  if (currentUsername === null) {
    askForUsername();
  } else {
    showGreeting(currentUsername);
  }
}


function init() {
  loadUsername();
}

init();