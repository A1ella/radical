let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
    cartTotal.textContent = 'Итого: 0 сом';
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} — ${item.price} сом`;
    total += item.price;
    cartItemsContainer.appendChild(li);
  });

  cartTotal.textContent = 'Итого: ' + total + ' сом';
}

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  if (cart.length === 0) return alert('Корзина пуста!');
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push({ id: Date.now(), items: cart });
  localStorage.setItem('orders', JSON.stringify(orders));
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  alert('Заказ оформлен!');
});

renderCart();
