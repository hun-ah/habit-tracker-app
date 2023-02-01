let updateBtns = document.querySelectorAll('.update')
let deleteBtns = document.querySelectorAll('.delete')
let habitsLeft = Number(document.querySelector('.circle').innerText)

n = new Date()
const date = n.toString().split(' ').splice(0, 4).join(' ')

document.querySelector('.current-date').innerHTML += date

for (i of updateBtns) {
   i.addEventListener('click', updateHabit)
}

for (i of deleteBtns) {
   i.addEventListener('click', deleteHabit)
}

const myForm = document.querySelector('form');
const myInput = document.querySelector('input');

myForm.addEventListener('submit', function (pEvent) {
   if (myInput.value === '') {
      pEvent.preventDefault();
      alert('Please enter a habit.');
   }
});

async function updateHabit() {
   const habitId = this.parentNode.parentNode.parentNode.dataset.id

   const habitName = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText

   const streak = Number(this.parentNode.parentNode.childNodes[1].childNodes[3].innerText.split(' ').slice(0, 2).pop())

   console.log(habitId)

   this.style['pointer-events'] = 'none'

   const res = await fetch('/habits/updateHabit', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         habit: habitName,
         streak: streak,
         ['current-date']: date,
         clicked: 'true',
         lastClickedMs: new Date(date + ', 00:00:00').getTime(),
         habitId: habitId
      })
   })
   const data = await res.json()
   console.log(data)
   location.reload()
}

async function deleteHabit() {
   const habitId = this.parentNode.parentNode.parentNode.dataset.id

   const res = await fetch('/habits/deleteHabit', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         habitId: habitId
      })
   })
   const data = await res.json()
   console.log(data)
   location.reload()
}