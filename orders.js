const ordersList = document.getElementById('orders-list');
const orders = JSON.parse(localStorage.getItem('orders')) || [];

if (orders.length === 0) {
  ordersList.innerHTML = '<p>У вас пока нет заказов.</p>';
} else {
  ordersList.innerHTML = '';
  orders.forEach(order => {
    const div = document.createElement('div');
    div.className = 'order';
    div.innerHTML = '<strong>Заказ #' + order.id + '</strong><ul>' +
      order.items.map(item => '<li>' + item.name + ' — ' + item.price + ' сом</li>').join('') +
      '</ul>';
    ordersList.appendChild(div);
  });
}
