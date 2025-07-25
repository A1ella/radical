// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  }
}

// Инициализация темы при загрузке
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    applyTheme(true);
  } else if (savedTheme === 'dark') {
    applyTheme(false);
  } else {
    applyTheme(!prefersDark); // По умолчанию: авто
  }
});

// Клик по кнопке переключения темы
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("light");
  const toggleBtn = document.getElementById("theme-toggle");
  const isLight = document.body.classList.contains("light");
  toggleBtn.textContent = isLight ? "☀️" : "🌙";
});

// Активация "звёздочек" рейтинга
document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('.stars span');
  stars.forEach((star, index) => {
    star.addEventListener('click', () => {
      stars.forEach((s, i) => {
        s.classList.toggle('selected', i <= index);
      });
    });
  });
});

// Отправка отзыва
document.getElementById('review-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = document.getElementById('review-text').value.trim();
  const rating = document.querySelectorAll('.stars span.selected').length;

  if (text === '') return;

  const reviewElement = document.createElement('div');
  reviewElement.className = 'review';
  reviewElement.innerHTML = `<strong>${'★'.repeat(rating)}:</strong> ${text}`;
  document.getElementById('reviews-container').prepend(reviewElement);

  saveReview({ rating, text });

  this.reset();
  document.querySelectorAll('.stars span').forEach(s => s.classList.remove('selected'));
});

// Сохранение отзывов в localStorage
function saveReview(review) {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.unshift(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Загрузка отзывов при загрузке страницы
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const container = document.getElementById('reviews-container');
  reviews.forEach(r => {
    const el = document.createElement('div');
    el.className = 'review';
    el.innerHTML = `<strong>${'★'.repeat(r.rating)}:</strong> ${r.text}`;
    container.appendChild(el);
  });
}
loadReviews();

// Поведение кнопок Купить
document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('Свяжитесь с нами в Telegram для оформления заказа 📦');
  });
});
