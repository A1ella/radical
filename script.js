// Тема
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme');
});

// Подсветка звёзд
let currentRating = 0;
const stars = document.querySelectorAll('#star-container span');
stars.forEach(star => {
  star.addEventListener('click', () => {
    currentRating = parseInt(star.dataset.value);
    updateStars(currentRating);
  });
});

function updateStars(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

// Отзывы
const form = document.getElementById('review-form');
const container = document.getElementById('reviews-container');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = document.getElementById('review-text').value.trim();
  if (text === '' || currentRating === 0) return;

  const div = document.createElement('div');
  div.className = 'review';
  div.innerHTML = `
    <div class="review-stars">${'★'.repeat(currentRating)}</div>
    <p>${text}</p>
    <button class="delete-btn">Удалить</button>
  `;

  container.prepend(div);
  form.reset();
  updateStars(0);
  currentRating = 0;
});

// Удаление
container.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }
});
