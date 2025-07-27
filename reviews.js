<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Отзывы клиентов – Radical</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body class="dark-theme">
  <header>
    <div class="container nav-container">
      <h1 class="logo">Radical</h1>
      <nav>
        <ul class="nav-links">
          <li><a href="index.html">Главная</a></li>
          <li><a href="index.html#products">Товары</a></li>
          <li><a href="index.html#articles">Статьи</a></li>
          <li><a href="index.html#cart">Корзина</a></li>
          <li><a href="reviews.html" class="active">Отзывы</a></li>
        </ul>
        <button id="theme-toggle">🌗</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="reviews-section">
      <h2>Отзывы клиентов</h2>
      <form id="review-form" class="review-form">
        <input type="text" id="review-name" placeholder="Ваше имя" required />
        <textarea id="review-text" placeholder="Ваш отзыв" required></textarea>
        <button type="submit">Оставить отзыв</button>
      </form>

      <div id="reviews-list" class="reviews-list">
        <!-- Отзывы добавляются через JS -->
      </div>
    </section>
  </main>

  <footer>
    <p>© 2025 Radical. Все права защищены.</p>
  </footer>

  <!-- Скрипт -->
  <script src="script.js"></script>
</body>
</html>
