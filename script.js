AOS.init();

// меню гамбургер
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>{
  navLinks.classList.toggle('open');
});

// тема
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('light-theme');
  themeToggle.textContent = document.body.classList.contains('light-theme')?'🌞':'🌙';
  localStorage.setItem('theme', document.body.classList.contains('light-theme')?'light':'dark');
});
document.addEventListener('DOMContentLoaded',()=>{
  const saved = localStorage.getItem('theme');
  if(saved==='light') { document.body.classList.add('light-theme'); themeToggle.textContent='🌞'; }
});

// отзывы
const stars = document.querySelectorAll('#star-container span'), reviewsContainer = document.getElementById('reviews-container');
let selectedRating = 0;
stars.forEach(s=>s.addEventListener('click', ()=>{
  selectedRating = +s.dataset.value;
  stars.forEach(x=>x.classList.toggle('active', +x.dataset.value <= selectedRating));
}));
const stored = JSON.parse(localStorage.getItem('reviews')||'[]');
stored.forEach(r=>addReviewEl(r.text,r.rating));
document.getElementById('review-form').addEventListener('submit',e=>{
  e.preventDefault();
  const txt = document.getElementById('review-text').value.trim();
  if(!selectedRating||!txt) return;
  addReviewEl(txt, selectedRating);
  stored.unshift({text:txt,rating:selectedRating});
  localStorage.setItem('reviews', JSON.stringify(stored.slice(0,50)));
  document.getElementById('review-text').value='';
  selectedRating = 0;
  stars.forEach(x=>x.classList.remove('active'));
});
reviewsContainer.addEventListener('click', e=>{
  if(e.target.classList.contains('delete-btn')){
    const el = e.target.closest('.review');
    const idx = Array.from(reviewsContainer.children).indexOf(el);
    stored.splice(idx,1);
    localStorage.setItem('reviews', JSON.stringify(stored));
    el.remove();
  }
});
function addReviewEl(text, rating){
  const d = document.createElement('div');
  d.className = 'review';
  d.innerHTML = `<div class="stars">${'★'.repeat(rating)}</div><p>${text}</p><button class="delete-btn">Удалить</button>`;
  reviewsContainer.prepend(d);
}

// кнопки купить
document.querySelectorAll('.buy-btn').forEach(btn=>{
  btn.addEventListener('click', e=>{
    e.preventDefault();
    showPopup();
    setTimeout(()=> window.open(btn.dataset.link,'_blank'),300);
  });
});
function showPopup(){
  const p = document.getElementById('buy-popup');
  p.classList.add('show');
  setTimeout(()=> p.classList.remove('show'),3000);
}
