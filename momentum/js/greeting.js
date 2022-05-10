const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greetingContent = document.querySelector('#greeting-content');
const greeting = document.querySelector('#greeting');
const logoutInput = document.querySelector('.logout-input');

// 일반적으로 string만 포함된 변수는 대문자로 표기함
// 그리고 loginForm이나 loginInput처럼 중요한 정보를 담은 것이 아니기 때문에 대문자로 표기
const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

// handle loginForm and greetingContent
function handleLoginForm() {
  loginForm.classList.toggle(HIDDEN_CLASSNAME);
}

function handleGreetingContent() {
  greetingContent.classList.toggle(HIDDEN_CLASSNAME);
}

// submit username
function onSubmit(event) {
  event.preventDefault();
  handleLoginForm();
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

// show up greeting after submit
function paintGreetings(username) {
  greeting.innerHTML = `Hello ${username}`;
  handleGreetingContent();
}

// button that remove username from localStorage
function removeBtn() {
  localStorage.removeItem(USERNAME_KEY);
  // refresh page with logout
  window.location.reload();
}

// constant that bring username stored in localStorage
const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
  handleLoginForm();
  loginForm.addEventListener('submit', onSubmit);
} else {
  paintGreetings(savedUserName);
}

logoutInput.addEventListener('click', removeBtn);
