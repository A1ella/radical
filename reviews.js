document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.getElementById("review-form");
  const reviewList = document.getElementById("review-list");

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  function renderReviews() {
    reviewList.innerHTML = "";
    reviews.forEach((review, index) => {
      const div = document.createElement("div");
      div.className = "review-item";
      div.innerHTML = `
        <strong>${review.name}</strong>
        <p>${review.text}</p>
        <button onclick="deleteReview(${index})">✖</button>
      `;
      reviewList.appendChild(div);
    });
  }

  window.deleteReview = function(index) {
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    renderReviews();
  }

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("review-name").value.trim();
    const text = document.getElementById("review-text").value.trim();
    if (name && text) {
      reviews.push({ name, text });
      localStorage.setItem("reviews", JSON.stringify(reviews));
      renderReviews();
      reviewForm.reset();
    }
  });

  renderReviews();
});
