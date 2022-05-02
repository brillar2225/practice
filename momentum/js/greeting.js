const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');

// 일반적으로 string만 포함된 변수는 대문자로 표기함
// 그리고 loginForm이나 loginInput처럼 중요한 정보를 담은 것이 아니기 때문에 대문자로 표기
const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function onSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

function paintGreetings(username) {
  greeting.innerHTML = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}
// localStorage에 저장된 username을 가져오는 변수
const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener('submit', onSubmit);
} else {
  paintGreetings(savedUserName);
}
