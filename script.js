// Переключение темы
const toggle = document.getElementById("themeToggle");
const body = document.body;

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});

// Сохраняем тему при перезагрузке
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
  }
  loadProducts();
});

// Подгрузка товаров из JSON
function loadProducts() {
  fetch("products.json")
    .then((res) => res.json())
    .then((products) => {
      const container = document.getElementById("productList");
      products.forEach((p) => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <strong>${p.price}₽</strong><br/>
          <button onclick="buyProduct('${p.name}')">Купить</button>
        `;
        container.appendChild(div);
      });
    });
}

// Покупка товара (заглушка)
function buyProduct(name) {
  alert(`Вы выбрали товар: ${name}. Покупка будет доступна в полной версии.`);
}

// Эффект тыкания
document.addEventListener("click", (e) => {
  const circle = document.createElement("div");
  circle.className = "click-circle";
  circle.style.top = `${e.clientY}px`;
  circle.style.left = `${e.clientX}px`;
  document.body.appendChild(circle);
  setTimeout(() => circle.remove(), 500);
});
