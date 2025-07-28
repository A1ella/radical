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

// ==================== Корзина и заказы ====================
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  showToast('Товар добавлен в корзину!');
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  if (!list || !total) return;

  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  list.innerHTML = '';
  let sum = 0;

  cart.forEach((item, index) => {
    list.innerHTML += `
      <li>
        ${item.name} — ${item.price.toLocaleString()} СОМ
        <button onclick="removeFromCart(${index})" style="float:right;">Удалить</button>
      </li>
    `;
    sum += item.price;
  });

  total.textContent = `Итого: ${sum.toLocaleString()} СОМ`;
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

renderCart();

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) return alert('Корзина пуста!');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.push(...cart);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('cart');
  alert('Заказ оформлен!');
  renderCart();
  renderOrders();
});

function renderOrders() {
  const list = document.getElementById('orders-list');
  if (!list) return;
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  list.innerHTML = '';
  orders.forEach((item, i) => {
    list.innerHTML += `<li>№${i + 1}: ${item.name} — ${item.price.toLocaleString()} СОМ</li>`;
  });
}
renderOrders();

// ==================== Отзывы ====================
document.getElementById('review-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('review-name').value.trim();
  const text = document.getElementById('review-text').value.trim();
  if (!name || !text) return;

  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.push({ name, text });
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
      <strong>${name}</strong>
      <p>${text}</p>
      <button onclick="deleteReview(${index})" style="margin-top: 0.5rem;">Удалить</button>
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

// ==================== Уведомление ====================
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.background = '#333';
  toast.style.color = '#fff';
  toast.style.padding = '0.8rem 1.2rem';
  toast.style.borderRadius = '6px';
  toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  toast.style.zIndex = 9999;
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease';
  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = '1', 100);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
