// Загружаем отзывы при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  loadReviews();
});

// Функция загрузки отзывов из localStorage
function loadReviews() {
  const reviewList = document.getElementById('review-list');
  const savedReviews = JSON.parse(localStorage.getItem('radicalReviews')) || [];

  reviewList.innerHTML = ''; // очистить перед вставкой

  savedReviews.forEach((review, index) => {
    const card = createReviewCard(review.name, review.text, index);
    reviewList.appendChild(card);
  });
}

// Функция создания карточки отзыва
function createReviewCard(name, text, index) {
  const card = document.createElement('div');
  card.className = 'review-card';

  const nameElem = document.createElement('strong');
  nameElem.textContent = name;

  const textElem = document.createElement('p');
  textElem.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-review';
  deleteBtn.innerHTML = '✖';
  deleteBtn.addEventListener('click', () => deleteReview(index));

  card.appendChild(nameElem);
  card.appendChild(textElem);
  card.appendChild(deleteBtn);

  return card;
}

// Функция отправки отзыва
document.getElementById('submit-review').addEventListener('click', () => {
  const nameInput = document.getElementById('review-name');
  const textInput = document.getElementById('review-text');

  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (name === '' || text === '') return;

  const reviewList = document.getElementById('review-list');
  const savedReviews = JSON.parse(localStorage.getItem('radicalReviews')) || [];

  savedReviews.push({ name, text });
  localStorage.setItem('radicalReviews', JSON.stringify(savedReviews));

  const card = createReviewCard(name, text, savedReviews.length - 1);
  reviewList.appendChild(card);

  nameInput.value = '';
  textInput.value = '';
});

// Функция удаления отзыва
function deleteReview(index) {
  let reviews = JSON.parse(localStorage.getItem('radicalReviews')) || [];
  reviews.splice(index, 1);
  localStorage.setItem('radicalReviews', JSON.stringify(reviews));
  loadReviews();
}
