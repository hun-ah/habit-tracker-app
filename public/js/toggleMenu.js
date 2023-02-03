const hamburgerBtn = document.querySelector('.hamburger')
const mobileMenu = document.querySelector('.mobile-menu')
const menuContent = document.querySelector('.menu-content')
const menuItem = document.querySelector('.menu-item')

hamburgerBtn.addEventListener('click', toggleMenu)
menuItem.addEventListener('click', toggleMenu)

function toggleMenu() {
   hamburgerBtn.classList.toggle('is-active')
   mobileMenu.classList.toggle('is-active')
   menuContent.classList.toggle('is-active')
}