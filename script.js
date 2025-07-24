
document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('light-theme');
  this.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
});

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
