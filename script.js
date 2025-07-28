// script.js

// Темы
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

// Поиск
const searchInput = document.getElementById("search-input");
const productList = document.getElementById("product-list");

let products = [];

fetch("products.json")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    renderProducts(data);
  });

function renderProducts(items) {
  productList.innerHTML = "";
  items.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} сом</p>
      <button class="buy-btn" data-id="${product.id}">Купить</button>
    `;
    productList.appendChild(productCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// Корзина
const toast = document.getElementById("cart-toast");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("buy-btn")) {
    const id = e.target.dataset.id;
    const product = products.find((p) => p.id == id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    showToast();
  }
});

function showToast() {
  if (!toast) return;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 2000);
}

// Отзывы
const reviewForm = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");

function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviewList.innerHTML = "";
  reviews.forEach((rev, i) => {
    const div = document.createElement("div");
    div.className = "review";
    div.innerHTML = `
      <strong>${rev.name}</strong>
      <p>${rev.text}</p>
      <button data-index="${i}" class="delete-review">Удалить</button>
    `;
    reviewList.appendChild(div);
  });
}

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("review-name").value.trim();
  const text = document.getElementById("review-text").value.trim();
  if (!name || !text) return;
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push({ name, text });
  localStorage.setItem("reviews", JSON.stringify(reviews));
  reviewForm.reset();
  loadReviews();
});

reviewList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-review")) {
    const i = e.target.dataset.index;
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.splice(i, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    loadReviews();
  }
});

loadReviews();
