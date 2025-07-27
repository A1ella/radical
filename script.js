document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    toggle.textContent = document.body.classList.contains("light-theme") ? "🌞" : "🌙";
  });

  const stars = document.querySelectorAll("#star-container span");
  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.value);
      updateStars(selectedRating);
    });
  });

  function updateStars(rating) {
    stars.forEach(star => {
      star.classList.toggle("active", parseInt(star.dataset.value) <= rating);
    });
  }

  const reviewForm = document.getElementById("review-form");
  const reviewText = document.getElementById("review-text");
  const reviewContainer = document.getElementById("reviews-container");

  reviewForm.addEventListener("submit", e => {
    e.preventDefault();
    const text = reviewText.value.trim();
    if (!text || !selectedRating) return;

    const review = document.createElement("div");
    review.className = "review";
    review.innerHTML = `
      <div class="stars">${"★".repeat(selectedRating)}</div>
      <p>${text}</p>
      <button class="delete-btn">Удалить</button>
    `;
    reviewContainer.prepend(review);
    reviewText.value = "";
    selectedRating = 0;
    updateStars(0);
  });

  reviewContainer.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
      e.target.parentElement.remove();
    }
  });
});

// Покупка (всплывающее сообщение)
function showPopup() {
  const popup = document.getElementById("buy-popup");
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3000);
}
