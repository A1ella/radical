// Переключение темы
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  document.body.classList.toggle('dark-theme', !isLight);
  toggle.textContent = isLight ? '🌞' : '🌙';
});

// Отзывы — звёзды
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

// Отправка и отображение отзывов
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

// Удаление отзыва
reviewContainer.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.parentElement.remove();
  }
});

// Анимация появления элементов при прокрутке
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.product, article, .review').forEach(el => {
  el.classList.add('hidden');
  observer.observe(el);
});