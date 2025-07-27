
// AOS инициализация
AOS.init();

// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  themeToggle.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
});

// Отзывы и рейтинг
const stars = document.querySelectorAll('#star-container span');
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);
    updateStarUI(selectedRating);
  });
});

function updateStarUI(rating) {
  stars.forEach(star => {
    star.classList.toggle('active', parseInt(star.dataset.value) <= rating);
  });
}

const reviewForm = document.getElementById('review-form');
const reviewText = document.getElementById('review-text');
const reviewContainer = document.getElementById('reviews-container');

reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  if (!selectedRating || !reviewText.value.trim()) return;

  const reviewDiv = document.createElement('div');
  reviewDiv.className = 'review fade-in';
  reviewDiv.innerHTML = `
    <div class="stars">${'★'.repeat(selectedRating)}</div>
    <p>${reviewText.value}</p>
    <button class="delete-btn">Удалить</button>
  `;
  reviewContainer.prepend(reviewDiv);
  reviewText.value = '';
  selectedRating = 0;
  updateStarUI(0);
});

reviewContainer.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }
});
