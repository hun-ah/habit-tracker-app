const hamburgerBtn = document.querySelector('.hamburger')
const mobileMenu = document.querySelector('.mobile-menu')
const menuContent = document.querySelector('.menu-content')
const menuItems = document.querySelectorAll('.menu-item')
const body = document.querySelector('body')

hamburgerBtn.addEventListener('click', toggleMenu)

for (i of menuItems) {
   i.addEventListener('click', toggleMenu)
}

function toggleMenu() {
   hamburgerBtn.classList.toggle('is-active')
   mobileMenu.classList.toggle('is-active')
   menuContent.classList.toggle('is-active')
   body.classList.toggle('no-scroll')
   body.classList.toggle('fixed-position')
}