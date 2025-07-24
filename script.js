document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('products');
    data.forEach(product => {
      const div = document.createElement('div');
      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}" width="200" />
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <a href="https://t.me/your_bot" target="_blank" class="buy-button">Купить</a>
      `;
      container.appendChild(div);
    });
  });
