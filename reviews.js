
// reviews.js — обработка отзывов со звездами и localStorage

document.addEventListener("DOMContentLoaded", () => {
  const reviewForm = document.getElementById("review-form");
  const reviewsContainer = document.getElementById("reviews-list");
  const ratingInputs = document.querySelectorAll('input[name="rating"]');

  const getReviews = () => JSON.parse(localStorage.getItem("reviews")) || [];

  const saveReviews = (reviews) => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  };

  const createReviewElement = (review) => {
    const div = document.createElement("div");
    div.classList.add("review");
    div.innerHTML = `
      <h4>${review.name} <span class="email">&lt;${review.email}&gt;</span></h4>
      <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <p>${review.comment}</p>
      <span class="timestamp">${new Date(review.timestamp).toLocaleString()}</span>
    `;
    return div;
  };

  const renderReviews = () => {
    const reviews = getReviews();
    reviewsContainer.innerHTML = "";
    reviews.forEach((review) => {
      reviewsContainer.appendChild(createReviewElement(review));
    });
  };

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = reviewForm.elements["name"].value.trim();
    const email = reviewForm.elements["email"].value.trim();
    const comment = reviewForm.elements["comment"].value.trim();
    const rating = [...ratingInputs].find((i) => i.checked)?.value || 0;

    if (!name || !email || !comment || rating == 0) {
      alert("Пожалуйста, заполните все поля и выберите рейтинг.");
      return;
    }

    const newReview = {
      name,
      email,
      comment,
      rating: parseInt(rating),
      timestamp: Date.now(),
    };

    const reviews = getReviews();
    reviews.push(newReview);
    saveReviews(reviews);
    renderReviews();
    reviewForm.reset();
  });

  renderReviews();
});
