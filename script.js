// Темная/светлая тема
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// При загрузке — применяем сохранённую тему
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light');
  }
  loadSavedReviews();
});

// Рейтинг звездами
const stars = document.querySelectorAll('.star');
let selectedRating = 5;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.value);
    updateStars();
  });
});

function updateStars() {
  stars.forEach(star => {
    star.classList.toggle('selected', parseInt(star.dataset.value) <= selectedRating);
  });
}

// Обработка формы
const form = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviews-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (!name || !email || !comment) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  const review = {
    name,
    email,
    comment,
    rating: selectedRating,
    date: new Date().toLocaleString()
  };

  saveReview(review);
  addReviewToDOM(review);
  form.reset();
  selectedRating = 5;
  updateStars();
});

// Сохраняем в localStorage
function saveReview(review) {
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Загружаем сохранённые отзывы
function loadSavedReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviewsList.innerHTML = '';
  reviews.forEach(addReviewToDOM);
}

// Добавляем отзыв в DOM
function addReviewToDOM(review) {
  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card animate';

  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);

  reviewCard.innerHTML = `
    <h3>${review.name}</h3>
    <p class="stars">${stars}</p>
    <p class="comment">"${review.comment}"</p>
    <span class="date">${review.date}</span>
  `;

  reviewsList.prepend(reviewCard); // Новый сверху
  <script src="script.js"></script>
</body>
}
