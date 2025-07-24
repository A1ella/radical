
const toggle = document.getElementById('theme-toggle');
let darkMode = true;

toggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  darkMode = !darkMode;
  toggle.innerText = darkMode ? '🌗' : '🌞';
});
