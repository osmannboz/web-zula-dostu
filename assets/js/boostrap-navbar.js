document.addEventListener("DOMContentLoaded", function() {
  const navToggle = document.getElementById('id-navbar-toggle');
  const navMenu = document.getElementById('id-navbar-menu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show-menu');
    navToggle.classList.toggle('show-icon');
  });
});
