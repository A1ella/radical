// script.js

// Переключение темы
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.onclick = () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
};

// Слайдер
const slides = document.querySelectorAll('.slide');
let index = 0;
setInterval(() => {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}, 3000);

// Продукты
const products = [
  { id: 1, title: "Смартфон", category: "electronics", price: 15000 },
  { id: 2, title: "Футболка", category: "clothes", price: 1200 },
  { id: 3, title: "Наушники", category: "electronics", price: 3000 }
];

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  let filtered = products;

  const category = document.getElementById('category-filter').value;
  const sort = document.getElementById('sort-filter').value;
  const query = document.getElementById('search-input').value.toLowerCase();

  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (query) {
    filtered = filtered.filter(p => p.title.toLowerCase().includes(query));
  }
  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  for (const p of filtered) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <h3>${p.title}</h3>
      <p>Цена: ${p.price} сом</p>
      <button onclick="addToCart(${p.id})">Добавить</button>
    `;
    list.appendChild(card);
  }
}

document.getElementById('category-filter').onchange = renderProducts;
document.getElementById('sort-filter').onchange = renderProducts;
document.getElementById('search-input').oninput = renderProducts;
renderProducts();

// Корзина
const cart = [];
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  const items = document.getElementById('cart-items');
  items.innerHTML = '';
  let total = 0;
  for (const item of cart) {
    const li = document.createElement('li');
    li.textContent = `${item.title} — ${item.price} сом`;
    items.appendChild(li);
    total += item.price;
  }
  document.getElementById('cart-total').textContent = `Итого: ${total} сом`;
}

// Отзывы
let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');

function addReview() {
  const name = document.getElementById('review-name').value.trim();
  const text = document.getElementById('review-text').value.trim();
  if (!name || !text) return;
  reviews.push({ name, text });
  localStorage.setItem('reviews', JSON.stringify(reviews));
  renderReviews();
}

function renderReviews() {
  const list = document.getElementById('review-list');
  list.innerHTML = '';
  reviews.forEach((r, i) => {
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = `
      <strong>${r.name}</strong>
      <p contenteditable="true" onblur="editReview(${i}, this.textContent)">${r.text}</p>
      <button onclick="deleteReview(${i})">Удалить</button>
    `;
    list.appendChild(div);
  });
}

function deleteReview(index) {
  reviews.splice(index, 1);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  renderReviews();
}

function editReview(index, newText) {
  reviews[index].text = newText;
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

renderReviews();
