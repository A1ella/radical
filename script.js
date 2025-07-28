// Тема
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', ()=> {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme');
});
const saved = localStorage.getItem('theme');
if (saved) document.body.className = saved;

// Корзина
function updateCartUI(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const ul = document.getElementById('cart-items');
  ul.innerHTML = '';
  let sum=0;
  cart.forEach((i,idx)=>{
    sum+=i.price;
    const li = document.createElement('li');
    li.textContent = `${i.name} — ${i.price} СОМ`;
    ul.appendChild(li);
  });
  document.getElementById('cart-total').textContent = `Итого: ${sum} сом`;
}
window.addToCart = function(name, price){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  cart.push({name,price});
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`"${name}" добавлен в корзину`);
  updateCartUI();
};

// Заказы (при оформлении переносим корзину в заказы)
document.getElementById('checkout-btn').addEventListener('click', ()=>{
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  if(cart.length===0){ alert('Корзина пуста'); return; }
  let orders = JSON.parse(localStorage.getItem('orders')||'[]');
  orders.push(...cart);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.setItem('cart', '[]');
  updateCartUI();
  updateOrdersUI();
  alert('Спасибо! Заказ оформлен.');
});

// Обновление заказов UI
function updateOrdersUI(){
  const orders = JSON.parse(localStorage.getItem('orders')||'[]');
  const ul = document.getElementById('orders-list');
  ul.innerHTML = '';
  orders.forEach(i=>{
    const li = document.createElement('li');
    li.textContent = `${i.name} — ${i.price} СОМ`;
    ul.appendChild(li);
  });
}

// Отзывы
const form = document.getElementById('review-form');
const list = document.getElementById('review-list');
let reviews = JSON.parse(localStorage.getItem('reviews')||'[]');
function renderReviews(){
  list.innerHTML='';
  reviews.forEach((r,i)=>{
    const div = document.createElement('div');
    div.classList.add('review-item');
    div.innerHTML = `<strong>${r.name}</strong><p>${r.text}</p>
      <div class="review-buttons">
        <button onclick="editReview(${i})">Редактировать</button>
        <button onclick="deleteReview(${i})">Удалить</button>
      </div>`;
    list.appendChild(div);
  });
}
form.addEventListener('submit', e=>{
  e.preventDefault();
  const name = form['review-name'].value.trim();
  const text = form['review-text'].value.trim();
  if(name && text){ reviews.push({name,text}); localStorage.setItem('reviews', JSON.stringify(reviews)); renderReviews(); form.reset(); }
});
function deleteReview(i){ reviews.splice(i,1); localStorage.setItem('reviews', JSON.stringify(reviews)); renderReviews(); }
function editReview(i){
  const name = prompt('Имя:', reviews[i].name);
  const text = prompt('Отзыв:', reviews[i].text);
  if(name && text){ reviews[i]={name,text}; localStorage.setItem('reviews', JSON.stringify(reviews)); renderReviews(); }
}

window.onload = ()=>{ updateCartUI(); updateOrdersUI(); renderReviews(); };
