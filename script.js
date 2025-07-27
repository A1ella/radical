// ==== Переключение темы ====
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.className = savedTheme;
}

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-theme")) {
    body.classList.replace("dark-theme", "light-theme");
    localStorage.setItem("theme", "light-theme");
  } else {
    body.classList.replace("light-theme", "dark-theme");
    localStorage.setItem("theme", "dark-theme");
  }
});

// ==== Отзывы ====
const reviewForm = document.getElementById("review-form");
const reviewsList = document.getElementById("reviews-list");

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function renderReviews() {
  reviewsList.innerHTML = "";
  reviews.forEach((review, index) => {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");

    reviewItem.innerHTML = `
      <h4>${review.name}</h4>
      <p>${review.text}</p>
      <div class="review-buttons">
        <button onclick="editReview(${index})">✏️ Редактировать</button>
        <button onclick="deleteReview(${index})">🗑️ Удалить</button>
      </div>
    `;

    reviewsList.appendChild(reviewItem);
  });
}

function saveReviews() {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

function deleteReview(index) {
  reviews.splice(index, 1);
  saveReviews();
  renderReviews();
}

function editReview(index) {
  const review = reviews[index];
  const name = prompt("Редактировать имя:", review.name);
  const text = prompt("Редактировать отзыв:", review.text);
  if (name && text) {
    reviews[index] = { name, text };
    saveReviews();
    renderReviews();
  }
}

reviewForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameInput = document.getElementById("review-name");
  const textInput = document.getElementById("review-text");

  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  if (name && text) {
    reviews.push({ name, text });
    saveReviews();
    renderReviews();
    nameInput.value = "";
    textInput.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderReviews();
});
