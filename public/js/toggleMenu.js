const hamburgerBtn = document.querySelector('.hamburger')

hamburgerBtn.addEventListener('click', toggleMenu)

function toggleMenu() {
   hamburgerBtn.classList.toggle('is-active')
}