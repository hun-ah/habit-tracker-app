const updateBtns = document.querySelectorAll('.incomplete')
const deleteBtns = document.querySelectorAll('.delete')
const habitsLeft = Number(document.querySelector('.circle').innerText)
const completedHabits = document.querySelectorAll('.completed')

// Display todays date in browser
n = new Date()
const todaysDate = n.toString().split(' ').splice(0, 4).join(' ')
document.querySelector('.current-date').innerHTML += todaysDate

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

let clientDate = moment().startOf('day')._d
let TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
let formattedDate = moment.tz(clientDate, TIMEZONE).startOf('day').format()
let dateInMs = new Date(formattedDate).getTime()

let putDate = function (form) {
   let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
   form.timezone.value = timezone
}

// Async Functions
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
         ['current-date']: formattedDate,
         clicked: 'true',
         habitId: habitId,
         lastClickedMs: dateInMs
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
         ['current-date']: clientDate,
         clicked: 'false',
         habitId: habitId,
         lastClickedMs: new Date(clientDate).getTime() - 86400000
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