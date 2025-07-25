
// =========================
// 🌙 Переключение темы
// =========================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  localStorage.setItem("theme", body.classList.contains("dark-theme") ? "dark" : "light");
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }
});

// =========================
// 📌 Навигация по разделам
// =========================
document.querySelectorAll(".menu-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  });
});

// =========================
// ✨ Анимации при скролле
// =========================
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => {
  observer.observe(section);
});

// =========================
// 🛍️ Загрузка товаров
// =========================
fetch("products.json")
  .then(res => res.json())
  .then(products => {
    const container = document.getElementById("products-container");
    container.innerHTML = products.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="price">${product.price} сом</div>
        <button class="buy-btn">Купить</button>
      </div>
    `).join("");
  });

// =========================
// 💬 Отзывы (загрузка)
// =========================
window.addEventListener("load", () => {
  if (localStorage.getItem("reviews")) {
    const reviews = JSON.parse(localStorage.getItem("reviews"));
    const list = document.getElementById("reviews-list");
    list.innerHTML = reviews.map(r => `
      <div class="review">
        <div class="review-header">
          <strong>${r.name}</strong> — <span>${r.email}</span>
        </div>
        <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
        <p>${r.comment}</p>
      </div>
    `).join("");
  }
});
