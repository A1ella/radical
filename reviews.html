<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Отзывы — Radical</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background-color: #0d0d0d;
      color: #fff;
    }

    h2 {
      text-align: center;
      margin-top: 2rem;
      color: #ff9900;
      font-size: 2rem;
    }

    #review-form {
      max-width: 600px;
      margin: 2rem auto;
      text-align: center;
      background: #1a1a1a;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid #ff9900;
    }

    #review-form input,
    #review-form textarea {
      width: 90%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ff9900;
      background: #0d0d0d;
      color: #fff;
      border-radius: 6px;
      font-size: 1rem;
    }

    .rating-stars {
      display: flex;
      justify-content: center;
      margin: 10px 0;
    }

    .rating-stars span {
      font-size: 24px;
      cursor: pointer;
      color: #444;
      transition: color 0.2s ease;
    }

    .rating-stars span.selected {
      color: #ff9900;
    }

    #review-form button {
      padding: 10px 20px;
      background: #ff9900;
      color: #000;
      font-weight: bold;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    #review-form button:hover {
      background: #ffaa33;
    }

    #review-list {
      max-width: 600px;
      margin: 2rem auto;
    }

    .review-item {
      background: #1a1a1a;
      border: 1px solid #ff9900;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
      position: relative;
    }

    .review-item strong {
      color: #ff9900;
    }

    .review-item small {
      color: #888;
      font-size: 0.9rem;
      display: block;
      margin-bottom: 5px;
    }

    .review-item .stars {
      color: #ff9900;
      margin-bottom: 5px;
    }

    .review-item button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      color: #ff5555;
      font-size: 18px;
      cursor: pointer;
    }

    .back-btn {
      position: fixed;
      top: 20px;
      left: 20px;
      background: transparent;
      border: 2px solid #ff9900;
      color: #ff9900;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s ease;
      font-weight: bold;
    }

    .back-btn:hover {
      background: #ff9900;
      color: #000;
    }
  </style>
</head>
<body>

  <button class="back-btn" onclick="goHome()">← На главную</button>

  <h2>Отзывы</h2>

  <form id="review-form">
    <input type="text" id="review-name" placeholder="Ваше имя" required />
    <textarea id="review-text" placeholder="Ваш отзыв" required></textarea>
    
    <div class="rating-stars" id="star-rating">
      <span data-star="1">★</span>
      <span data-star="2">★</span>
      <span data-star="3">★</span>
      <span data-star="4">★</span>
      <span data-star="5">★</span>
    </div>

    <button type="submit">Отправить отзыв</button>
  </form>

  <div id="review-list"></div>

  <script>
    function goHome() {
      window.location.href = "index.html";
    }

    document.addEventListener("DOMContentLoaded", () => {
      const reviewForm = document.getElementById("review-form");
      const reviewList = document.getElementById("review-list");
      const starRating = document.getElementById("star-rating");
      let currentRating = 0;

      // Загрузка отзывов
      let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

      // Установка звёзд
      starRating.addEventListener("click", (e) => {
        if (e.target.dataset.star) {
          currentRating = parseInt(e.target.dataset.star);
          updateStarDisplay(currentRating);
        }
      });

      function updateStarDisplay(rating) {
        const stars = starRating.querySelectorAll("span");
        stars.forEach((star, index) => {
          if (index < rating) {
            star.classList.add("selected");
          } else {
            star.classList.remove("selected");
          }
        });
      }

      function renderReviews() {
        reviewList.innerHTML = "";
        if (reviews.length === 0) {
          reviewList.innerHTML = "<p style='text-align:center;color:#888;'>Пока нет отзывов.</p>";
          return;
        }

        reviews.forEach((review, index) => {
          const div = document.createElement("div");
          div.className = "review-item";
          div.innerHTML = `
            <button onclick="deleteReview(${index})">✖</button>
            <strong>${review.name}</strong>
            <small>${review.date}</small>
            <div class="stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>
            <p>${review.text}</p>
          `;
          reviewList.appendChild(div);
        });
      }

      // Удаление
      window.deleteReview = function(index) {
        reviews.splice(index, 1);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        renderReviews();
      };

      // Отправка
      reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("review-name").value.trim();
        const text = document.getElementById("review-text").value.trim();

        if (!name || !text || currentRating === 0) {
          alert("Пожалуйста, заполните все поля и выберите рейтинг.");
          return;
        }

        const now = new Date();
        const formattedDate = now.toLocaleDateString('ru-RU') + ' ' + now.toLocaleTimeString('ru-RU');

        const newReview = {
          name,
          text,
          rating: currentRating,
          date: formattedDate
        };

        reviews.push(newReview);
        localStorage.setItem("reviews", JSON.stringify(reviews));
        renderReviews();
        reviewForm.reset();
        currentRating = 0;
        updateStarDisplay(0);
      });

      renderReviews();
    });
  </script>
</body>
</html>
