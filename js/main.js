// Mobile menu toggle: the only behaviour the page needs.
const toggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');

const setOpen = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
};

toggle.addEventListener('click', () => {
  setOpen(toggle.getAttribute('aria-expanded') !== 'true');
});

// Close after choosing a link or pressing Escape.
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) setOpen(false);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setOpen(false);
});
