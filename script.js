document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Установка темы по умолчанию
  if (localStorage.getItem("theme") === "light" || (!localStorage.getItem("theme") && !prefersDark)) {
    document.body.classList.add("light");
  }

  // Переключатель темы
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  });

  // Загрузка товаров
  fetch("products.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("product-container");
      if (!container) return;

      data.products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <div class="price">${product.price} сом</div>
          <button class="buy-button" onclick="window.open('${product.link}', '_blank')">Купить</button>
        `;
        container.appendChild(card);

        // Плавное появление
        setTimeout(() => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        }, 100);
      });
    })
    .catch(err => console.error("Ошибка загрузки товаров:", err));
});
