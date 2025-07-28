// ==================== Переключение темы ====================
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.remove('dark-theme');
}

// ==================== Продукты ====================
const products = [
  { name: 'Наушники', price: 8490, image: 'https://via.placeholder.com/200' },
  { name: 'Умные часы', price: 14990, image: 'https://via.placeholder.com/200' },
  { name: 'AirPods Pro', price: 3990, image: 'https://via.placeholder.com/200' },
  { name: 'Powerbank', price: 2500, image: 'https://via.placeholder.com/200' }
];

function renderProducts(filter = '') {
  const container = document.getElementById('product-list');
  if (!container) return;
  container.innerHTML = '';
  products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())).forEach(p => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p class="price">${p.price.toLocaleString()} СОМ</p>
        <button onclick="addToCart('${p.name}', ${p.price})">Купить</button>
      </div>
    `;
  });
}
renderProducts();

document.getElementById('search-input')?.addEventListener('input', e => {
  renderProducts(e.target.value);
});

// ==================== Уведомление ====================
function showNotification(message) {
  const note = document.createElement("div");
  note.textContent = message;
  note.style.position = "fixed";
  note.style.bottom = "20px";
  note.style.right = "20px";
  note.style.padding = "1rem 1.5rem";
  note.style.background = "#ff9800";
  note.style.color = "#fff";
  note.style.borderRadius = "8px";
  note.style.boxShadow = "0 0 10px rgba(0,0,0,0.4)";
  note.style.zIndex = 9999;
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}

// ==================== Корзина и заказы ====================
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  showNotification('Товар добавлен в корзину!');
}

function renderCart() {
  const list = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  if (!list || !total) return;

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  list.innerHTML = '';
  let sum = 0;
  cart.forEach((item, index) => {
    sum += item.price * item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} — ${item.price.toLocaleString()} СОМ × ${item.quantity}
      <button onclick="removeFromCart(${index})">🗑️</button>
    `;
    list.appendChild(li);
  });
  total.textContent = `Итого: ${sum.toLocaleString()} СОМ`;
}
renderCart();

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  showNotification('Товар удалён из корзины!');
}

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) return alert('Корзина пуста!');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(...cart);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart');
  showNotification('Заказ оформлен!');
  renderCart();
  location.reload();
});

function renderOrders() {
  const list = document.getElementById('orders-list');
  if (!list) return;
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  list.innerHTML = '';
  orders.forEach((item, i) => {
    list.innerHTML += `<li>№${i + 1}: ${item.name} — ${item.price.toLocaleString()} СОМ × ${item.quantity || 1}</li>`;
  });
}
renderOrders();

// ==================== Отзывы ====================
document.getElementById('review-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('review-name').value.trim();
  const text = document.getElementById('review-text').value.trim();
  if (!name || !text) return;
  const review = { name, text };
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  renderReviews();
  this.reset();
});

function renderReviews() {
  const container = document.getElementById('review-list');
  if (!container) return;
  container.innerHTML = '';
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.forEach(({ name, text }, index) => {
    const el = document.createElement('div');
    el.className = 'review-item';
    el.innerHTML = `
      <strong>${name}</strong><p>${text}</p>
      <button onclick="deleteReview(${index})">Удалить</button>
    `;
    container.appendChild(el);
  });
}

function deleteReview(index) {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.splice(index, 1);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  renderReviews();
}
renderReviews();
