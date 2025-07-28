// ===== ПЕРЕКЛЮЧЕНИЕ ТЕМЫ =====
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

// ===== ПОКАЗ УВЕДОМЛЕНИЯ =====
function showNotification(message) {
  const note = document.getElementById("added-notification");
  note.innerText = message;
  note.style.display = "block";
  note.style.opacity = "1";
  setTimeout(() => {
    note.style.opacity = "0";
    setTimeout(() => {
      note.style.display = "none";
    }, 400);
  }, 2000);
}

// ===== КНОПКИ "КУПИТЬ" =====
document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const name = card.getAttribute("data-name");
    showNotification(`✔ Товар «${name}» добавлен в корзину`);
  });
});

// ===== ПОИСК ТОВАРОВ =====
document.getElementById("search-input").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

// ===== ОТЗЫВЫ (СОХРАНЕНИЕ, ОТОБРАЖЕНИЕ, УДАЛЕНИЕ) =====
document.addEventListener("DOMContentLoaded", () => {
  const reviewName = document.getElementById("review-name");
  const reviewText = document.getElementById("review-text");
  const reviewList = document.getElementById("review-list");
  const submitBtn = document.getElementById("submit-review");

  if (!reviewName || !reviewText || !reviewList || !submitBtn) return;

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  function saveReviews() {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  function renderReviews() {
    reviewList.innerHTML = "";
    reviews.forEach((review, index) => {
      const div = document.createElement("div");
      div.className = "review-card";
      div.innerHTML = `
        <strong>${review.name}</strong>
        <p>${review.text}</p>
        <button onclick="deleteReview(${index})" class="delete-btn">✖</button>
      `;
      reviewList.appendChild(div);
    });
  }

  window.deleteReview = function(index) {
    reviews.splice(index, 1);
    saveReviews();
    renderReviews();
  }

  submitBtn.addEventListener("click", () => {
    const name = reviewName.value.trim();
    const text = reviewText.value.trim();
    if (!name || !text) return;

    reviews.push({ name, text });
    saveReviews();
    renderReviews();
    reviewName.value = "";
    reviewText.value = "";
    showNotification("Спасибо за отзыв!");
  });

  renderReviews();
});
