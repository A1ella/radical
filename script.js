
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Тема: переключение
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");
  });

  // Загрузка товаров
  fetch("products.json")
    .then((res) => res.json())
    .then((products) => {
      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="\${product.image}" alt="\${product.name}" />
          <h3>\${product.name}</h3>
          <p>\${product.description}</p>
          <strong>\${product.price}₽</strong>
          <button class="buy-btn">Купить</button>
        `;
        card.querySelector(".buy-btn").addEventListener("click", () => {
          alert("Спасибо за интерес к товару: " + product.name);
        });
        productList.appendChild(card);
      });
    });
});
