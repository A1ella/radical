<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Отзывы — Radical</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #0e0e0e;
      color: #fff;
    }

    header {
      padding: 1.5rem;
      text-align: center;
      background: linear-gradient(to right, #ff9900, #ff6600);
      color: #000;
      font-size: 2rem;
      font-weight: bold;
    }

    .container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 12px;
      box-shadow: 0 0 12px rgba(255, 153, 0, 0.08);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      margin-bottom: 2rem;
    }

    input, textarea {
      padding: 0.8rem 1rem;
      font-size: 1rem;
      border-radius: 8px;
      border: none;
      background: #1a1a1a;
      color: #fff;
      outline: none;
      border: 1px solid #444;
    }

    button {
      background: #ff9900;
      color: #000;
      padding: 0.7rem 1.5rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: 0.3s ease;
    }

    button:hover {
      background: #ffa733;
    }

    .review-item {
      background: rgba(255, 255, 255, 0.04);
      border-left: 4px solid #ff9900;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 10px;
      position: relative;
      animation: fadeIn 0.4s ease;
    }

    .review-item strong {
      display: block;
      font-size: 1.1rem;
      color: #ff9900;
    }

    .review-item p {
      margin: 0.4rem 0 0;
    }

    .review-item button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      color: #ff4444;
      font-size: 1.2rem;
      border: none;
      cursor: pointer;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 600px) {
      .container {
        margin: 1rem;
        padding: 1rem;
      }
    }
  </style>
</head>
<body>

  <header>Отзывы</header>

  <div class="container">
    <form id="review-form">
      <input type="text" id="review-name" placeholder="Ваше имя" required />
      <textarea id="review-text" rows="4" placeholder="Ваш отзыв..." required></textarea>
      <button type="submit">Оставить отзыв</button>
    </form>

    <div id="review-list"></div>
  </div>

  <script>
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
  </script>

</body>
</html>
