// script.js

// ===== ТЕМА =====
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

// ===== УВЕДОМЛЕНИЕ =====
function showNotification(text) {
  const note = document.createElement("div");
  note.className = "notification";
  note.innerText = text;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2500);
}

// ===== КОРЗИНА =====
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification(`Товар «${product.name}» добавлен в корзину!`);
}

// ===== ЗАГРУЗКА ТОВАРОВ =====
async function loadProducts() {
  const res = await fetch("products.json");
  const products = await res.json();
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.setAttribute("data-name", product.name);
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price} сом</p>
      <button class="buy-btn">Купить</button>
    `;
    card.querySelector(".buy-btn").addEventListener("click", () => addToCart(product));
    list.appendChild(card);
  });
}
loadProducts();

// ===== ПОИСК =====
document.getElementById("search-input").addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

// ===== ОТЗЫВЫ =====
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
