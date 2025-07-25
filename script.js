// script.js — Основной скрипт сайта Radical

// Переключение темы (светлая/тёмная)
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Мобильное меню
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
}

// Загрузка товаров из products.json
fetch('products.json')
    .then(res => res.json())
    .then(products => {
        const container = document.getElementById('products-container');
        if (container) {
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="price">${product.price} сом</span>
                    <a class="buy-btn" href="https://t.me/yourchannel" target="_blank">Купить</a>
                `;
                container.appendChild(card);
            });
        }
    })
    .catch(err => console.error('Ошибка загрузки товаров:', err));

// Обработка отзывов (сохраняются в localStorage)
document.addEventListener('DOMContentLoaded', () => {
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-list');
    const starInputs = document.querySelectorAll('.star-input input');

    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviewsContainer.innerHTML = '';
        reviews.forEach(({ name, email, message, rating }) => {
            const review = document.createElement('div');
            review.className = 'review';
            review.innerHTML = `
                <h4>${name}</h4>
                <p class="stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
                <p>${message}</p>
            `;
            reviewsContainer.appendChild(review);
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener('submit', e => {
            e.preventDefault();
            const name = reviewForm.elements['name'].value.trim();
            const email = reviewForm.elements['email'].value.trim();
            const message = reviewForm.elements['message'].value.trim();
            const rating = +reviewForm.querySelector('input[name="rating"]:checked')?.value || 0;

            if (!name || !message || rating === 0) {
                alert('Пожалуйста, заполните все поля и выберите рейтинг.');
                return;
            }

            const newReview = { name, email, message, rating };
            const existing = JSON.parse(localStorage.getItem('reviews') || '[]');
            existing.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(existing));
            loadReviews();
            reviewForm.reset();
        });
    }

    loadReviews();
});

// Анимации при прокрутке (fade-in)
const animatedElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});
animatedElements.forEach(el => observer.observe(el));