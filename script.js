// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  body.classList.toggle('dark-theme');
});

// Отзывы: выбор звёзд
const starSpans = document.querySelectorAll('#review-form .stars span');
let currentRating = 0;

starSpans.forEach((star, index) => {
  star.addEventListener('mouseover', () => {
    starSpans.forEach((s, i) => {
      s.classList.toggle('active', i <= index);
    });
  });

  star.addEventListener('mouseout', () => {
    starSpans.forEach((s, i) => {
      s.classList.toggle('active', i < currentRating);
    });
  });

  star.addEventListener('click', () => {
    currentRating = index + 1;
    starSpans.forEach((s, i) => {
      s.classList.toggle('active', i < currentRating);
    });
  });
});

// Отправка и отображение отзыва
const reviewForm = document.getElementById('review-form');
const reviewText = document.getElementById('review-text');
const reviewsContainer = document.getElementById('reviews-container');

reviewForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!reviewText.value.trim() || currentRating === 0) {
    alert('Пожалуйста, введите отзыв и выберите рейтинг.');
    return;
  }

  const review = document.createElement('div');
  review.classList.add('review-card');

  const starsDiv = document.createElement('div');
  starsDiv.classList.add('stars');
  starsDiv.innerHTML = '★'.repeat(currentRating) + '☆'.repeat(5 - currentRating);

  const textP = document.createElement('p');
  textP.textContent = reviewText.value;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✕';
  deleteBtn.classList.add('delete-review');
  deleteBtn.onclick = () => review.remove();

  review.appendChild(starsDiv);
  review.appendChild(textP);
  review.appendChild(deleteBtn);

  reviewsContainer.prepend(review);

  // Сброс формы
  reviewText.value = '';
  currentRating = 0;
  starSpans.forEach((s) => s.classList.remove('active'));
});
