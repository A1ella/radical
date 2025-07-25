// Переключение темы
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});

// Загрузка товаров
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('product-list');
    data.forEach(product => {
      const div = document.createElement('div');
      div.className = 'product-item';
      div.innerHTML = \`
        <img src="\${product.image}" alt="\${product.name}" />
        <h3>\${product.name}</h3>
        <p>\${product.price} сом</p>
      \`;
      list.appendChild(div);
    });
  });

// Отзывы
const reviewForm = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');
reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const comment = document.getElementById('comment').value;
  const rating = document.querySelector('input[name="rating"]:checked')?.value || '5';
  const review = { name, email, comment, rating };
  let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  displayReviews();
  reviewForm.reset();
});

function displayReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviewList.innerHTML = '';
  reviews.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review';
    div.innerHTML = \`
      <h4>\${r.name}</h4>
      <p>\${r.comment}</p>
      <p>⭐ Оценка: \${r.rating}</p>
    \`;
    reviewList.appendChild(div);
  });
}

window.addEventListener('load', displayReviews);