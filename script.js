document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-list");
  const themeToggle = document.getElementById("theme-toggle");

  // Загрузка товаров из products.json
  fetch("products.json")
    .then((res) => res.json())
    .then((products) => {
      if (!productContainer) return;

      productContainer.innerHTML = "";

      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card fade-in";

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p class="price">${product.price} СОМ</p>
          <button class="buy" onclick="window.location.href='${product.link}'">Купить</button>
        `;

        productContainer.appendChild(card);
      });
    })
    .catch((err) => {
      console.error("Ошибка при загрузке товаров:", err);
      productContainer.innerHTML = "<p>Не удалось загрузить товары.</p>";
    });

  // Переключение темы
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  // Применение сохранённой темы
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  // Плавная анимация появления
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
});
