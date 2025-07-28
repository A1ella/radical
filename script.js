// ==== ТЕМА ====
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
});

// ==== УВЕДОМЛЕНИЕ ====
function showNotification(text) {
  const note = document.createElement("div");
  note.className = "notification";
  note.innerText = text;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 2500);
}

// ==== КОРЗИНА ====
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification(`Товар «${product.name}» добавлен в корзину!`);
  renderCartItems(); // обновить корзину
}

// ==== ЗАГРУЗКА ТОВАРОВ ====
async function loadProducts() {
  const res = await fetch("products.json");
  const products = await res.json();
  const list = document.getElementById("product-list");
  if (!list) return;

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

// ==== ПОИСК ====
document.getElementById("search-input")?.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
});

// ==== ОТЗЫВЫ ====
document.getElementById("submit-review")?.addEventListener("click", () => {
  const name = document.getElementById("review-name").value.trim();
  const text = document.getElementById("review-text").value.trim();
  if (!name || !text) return;

  const review = document.createElement("div");
  review.className = "review";
  review.innerHTML = `
    <strong>${name}</strong>
    <p>${text}</p>
    <span class="delete-review" title="Удалить отзыв">✖</span>
  `;
  review.querySelector(".delete-review").addEventListener("click", () => review.remove());
  document.getElementById("review-list").appendChild(review);

  document.getElementById("review-name").value = "";
  document.getElementById("review-text").value = "";
  showNotification("Спасибо за отзыв!");
});

// ==== КОРЗИНА: ОТОБРАЖЕНИЕ ====
function renderCartItems() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Корзина пуста.</p>";
    document.getElementById("total-sum").innerText = "0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += parseFloat(item.price);
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p><strong>${item.name}</strong> — ${item.price} сом</p>
      <button class="remove-btn" data-index="${index}">Удалить</button>
    `;
    container.appendChild(div);
  });

  document.getElementById("total-sum").innerText = total.toFixed(2);

  // Удаление товара
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
    });
  });
}
renderCartItems();

// ==== ОФОРМИТЬ ЗАКАЗ ====
document.getElementById("checkout-btn")?.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Корзина пуста!");
    return;
  }
  alert("Спасибо за заказ!");
  localStorage.removeItem("cart");
  renderCartItems();
});
