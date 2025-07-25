
// -----------------------------
// Основной скрипт для сайта Radical
// -----------------------------

// Переключение темы (тёмная/светлая)
const themeToggle = document.getElementById("theme-toggle");
themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
});

// Применение сохранённой темы
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
});

// Плавная прокрутка по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target?.scrollIntoView({ behavior: "smooth" });
    });
});

// Обработка отправки формы отзывов
document.getElementById("review-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("review-name").value;
    const email = document.getElementById("review-email").value;
    const comment = document.getElementById("review-comment").value;
    const rating = document.querySelector(".star-rating input:checked")?.value || 0;

    const newReview = {
        name,
        email,
        comment,
        rating,
        date: new Date().toLocaleDateString()
    };

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    renderReviews();
    this.reset();
    alert("Спасибо за ваш отзыв!");
});

// Отображение отзывов
function renderReviews() {
    const container = document.getElementById("reviews-container");
    if (!container) return;

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    container.innerHTML = "";

    reviews.reverse().forEach(review => {
        const div = document.createElement("div");
        div.className = "review";
        div.innerHTML = `
            <h4>${review.name} (${review.date})</h4>
            <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p>${review.comment}</p>
        `;
        container.appendChild(div);
    });
}

window.addEventListener("DOMContentLoaded", renderReviews);

// Анимация появления при прокрутке
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".animate").forEach(el => observer.observe(el));

// Загрузка товаров из products.json
fetch("products.json")
    .then(res => res.json())
    .then(data => {
        const productContainer = document.getElementById("product-list");
        if (!productContainer) return;

        productContainer.innerHTML = "";
        data.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card animate";
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">${product.price} сом</div>
                <a class="buy-button" href="https://t.me/yourtelegram" target="_blank">Купить</a>
            `;
            productContainer.appendChild(card);
        });
        document.querySelectorAll(".product-card").forEach(el => observer.observe(el));
    });
