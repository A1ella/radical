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
  if (list) {
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
}
loadProducts();

// ===== ПОИСК =====
const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".product-card").forEach(card => {
      const name = card.getAttribute("data-name").toLowerCase();
      card.style.display = name.includes(query) ? "block" : "none";
    });
  });
}

// ===== ОТЗЫВЫ =====
const submitBtn = document.getElementById("submit-review");
if (submitBtn) {
  submitBtn.addEventListener("click", () => {
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
}

// ===== ЗАГРУЗКА КОРЗИНЫ НА СТРАНИЦЕ cart.html =====
async function loadCart() {
  if (!window.location.href.includes("cart.html")) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-items");
  const totalElem = document.getElementById("total-price");

  if (!cartList || !totalElem) return;

  cartList.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += Number(item.price);
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <p>${item.price} сом</p>
        <button class="remove-btn" data-index="${index}">Удалить</button>
      </div>
    `;
    cartList.appendChild(cartItem);
  });

  totalElem.innerText = `${total} сом`;

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = +e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      showNotification("Товар удалён из корзины");
      loadCart(); // перезагрузка корзины
    });
  });
}
loadCart();
