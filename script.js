// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme');
  localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Применить сохранённую тему
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
  }
});

// Звук покупки
const buyButtons = document.querySelectorAll('.buy-btn.with-sound');
const sound = document.getElementById('buy-sound');

buyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  });
});

// Отзывы со звёздами + сохранение в localStorage
let currentRating = 0;
const stars = document.querySelectorAll('#star-container span');
const form = document.getElementById('review-form');
const container = document.getElementById('reviews-container');

// Обработка кликов по звёздам
stars.forEach(star => {
  star.addEventListener('click', () => {
    currentRating = parseInt(star.dataset.value);
    updateStars(currentRating);
  });
});

function updateStars(rating) {
  stars.forEach((star, index) => {
    star.classList.toggle('active', index < rating);
  });
}

// Сохранение отзывов в localStorage
function saveReviews() {
  const reviews = Array.from(container.children).map(div => ({
    stars: div.querySelector('.review-stars').textContent,
    text: div.querySelector('p').textContent
  }));
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function loadReviews() {
  const saved = localStorage.getItem('reviews');
  if (saved) {
    const reviews = JSON.parse(saved);
    reviews.forEach(({ stars, text }) => {
      const div = document.createElement('div');
      div.className = 'review';
      div.innerHTML = `<div class="review-stars">${stars}</div><p>${text}</p><button class="delete-btn">Удалить</button>`;
      container.appendChild(div);
    });
  }
}
loadReviews();

// Отправка отзыва
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = document.getElementById('review-text').value.trim();
  if (!text || currentRating === 0) return;

  const div = document.createElement('div');
  div.className = 'review';
  div.innerHTML = `<div class="review-stars">${'★'.repeat(currentRating)}</div><p>${text}</p><button class="delete-btn">Удалить</button>`;

  container.prepend(div);
  form.reset();
  updateStars(0);
  currentRating = 0;
  saveReviews();
});

// Удаление отзыва
container.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
    saveReviews();
  }
});
// Покупка (всплывающее сообщение)
function showPopup() {
  const popup = document.getElementById("buy-popup");
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3000);
}
