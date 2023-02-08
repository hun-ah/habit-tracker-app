const updateBtns = document.querySelectorAll('.incomplete')
const deleteBtns = document.querySelectorAll('.delete')
const habitsLeft = Number(document.querySelector('.circle').innerText)
const completedHabits = document.querySelectorAll('.completed')

// DATES IN STRING FORMAT
// Todays date
n = new Date()
const date = n.toString().split(' ').splice(0, 4).join(' ')
// Yesterdays date
const y = new Date(n)
y.setDate(y.getDate() - 1)
const yesterday = y.toDateString()

let now_utc = Date.UTC(n.getUTCFullYear(), n.getUTCMonth(),
   n.getUTCDate(), n.getUTCHours(),
   n.getUTCMinutes(), n.getUTCSeconds());

let dateUTC = n.toISOString()

document.querySelector('.current-date').innerHTML += date

// Event listeners for update, undo and delete buttons
for (i of updateBtns) {
   i.addEventListener('click', updateHabit)
}

for (i of deleteBtns) {
   i.addEventListener('click', deleteHabit)
}

for (i of completedHabits) {
   i.addEventListener('click', undoHabit)
}

// Prevent empty form submission
const myForm = document.querySelector('form');
const myInput = document.querySelector('input');

myForm.addEventListener('submit', function (pEvent) {
   if (myInput.value === '') {
      pEvent.preventDefault();
      alert('Please enter a habit.');
   }
});

// Functions
async function updateHabit() {
   const habitId = this.parentNode.parentNode.parentNode.dataset.id

   const habitName = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText

   const streak = Number(this.parentNode.parentNode.childNodes[1].childNodes[3].innerText.split(' ').slice(0, 2).pop())

   console.log(habitId)

   const res = await fetch('/habits/updateHabit', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         habit: habitName,
         streak: streak,
         ['current-date']: dateUTC,
         clicked: 'true',
         lastClickedMs: new Date(date + ', 00:00:00').getTime(),
         habitId: habitId
      })
   })
   const data = await res.json()
   console.log(data)
   location.reload()
}

async function undoHabit() {
   const habitId = this.parentNode.parentNode.parentNode.dataset.id

   const habitName = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText

   const streak = Number(this.parentNode.parentNode.childNodes[1].childNodes[3].innerText.split(' ').slice(0, 2).pop())

   const res = await fetch('/habits/undoHabit', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         habit: habitName,
         streak: streak,
         ['current-date']: yesterday,
         clicked: 'false',
         lastClickedMs: new Date(date + ', 00:00:00').getTime() - 86400000,
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