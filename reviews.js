const reviewForm = document.getElementById('review-form');
const reviewList = document.getElementById('review-list');

// Загрузка отзывов
function loadReviews() {
  const saved = JSON.parse(localStorage.getItem('reviews')) || [];
  reviewList.innerHTML = '';
  saved.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `<strong>${r.name}</strong><p>${r.text}</p>`;
    reviewList.appendChild(div);
  });
}

// Отправка отзыва
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('review-name').value;
  const text = document.getElementById('review-text').value;

  const newReview = { name, text };
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(newReview);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  reviewForm.reset();
  loadReviews();
});

loadReviews();
