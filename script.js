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

// ===== ДОБАВЛЕНИЕ ОТЗЫВА =====
document.getElementById("submit-review").addEventListener("click", () => {
  const name = document.getElementById("review-name").value.trim();
  const text = document.getElementById("review-text").value.trim();
  if (!name || !text) return;

  const review = document.createElement("div");
  review.className = "review-card";
  review.innerHTML = `<strong>${name}</strong><p>${text}</p>`;
  document.getElementById("review-list").appendChild(review);

  document.getElementById("review-name").value = "";
  document.getElementById("review-text").value = "";

  showNotification("Спасибо за отзыв!");
});
