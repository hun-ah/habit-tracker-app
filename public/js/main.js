const updateBtns = document.querySelectorAll('.update')
const deleteBtns = document.querySelectorAll('.delete')

// dates and times
let currentDateLocal = moment().startOf('day')._d.toString()
let utcDate = moment().utc().startOf('day')._d.toString()
let utcDateMs = new Date(utcDate).getTime()
console.log(`Today is: ${currentDateLocal}`)

// Display todays date in browser
document.querySelector('.current-date').innerHTML += currentDateLocal.split(' ').splice(0, 4).join(' ')

// select the li elements
const habitItems = document.querySelectorAll('#habits')
// declare habitsLeft variable
let habitsLeft = habitItems.length

// If habit is clicked: fade habit, else set class to false (take away fade)
for (i of habitItems) {
   let serverDate = new Date(i.dataset.lastcompleted)
   if (serverDate == currentDateLocal) {
      i.classList.toggle('fade-li')
      habitsLeft -= 1
   } else {
      i.classList.toggle('false')
   }
   console.log(`This element has a habit id of: ${i.dataset.id} and was last completed ${serverDate}`)
}

// When to show completed message
if (habitsLeft === 0 && habitItems.length > 0) {
   document.querySelector('.completed-container').classList.toggle('show-completed')
}

// Show how many habits left to user
const showHabitsLeft = document.querySelector('.circle').innerText = habitsLeft

// Event listeners for update, undo and delete buttons
for (i of updateBtns) {
   if (i.parentNode.parentNode.parentNode.className == 'fade-li') {
      i.addEventListener('click', undoHabit)
      i.classList.toggle('undo-btn')
      i.innerHTML = 'Undo'
   } else {
      i.addEventListener('click', updateHabit)
   }
}

for (i of deleteBtns) {
   i.addEventListener('click', deleteHabit)
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

// Async Functions
async function updateHabit() {
   const habitId = this.parentNode.parentNode.parentNode.dataset.id

   const habitName = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText

   const streak = Number(this.parentNode.parentNode.childNodes[1].childNodes[3].innerText.split(' ').slice(0, 2).pop())

   const res = await fetch('/habits/updateHabit', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         habit: habitName,
         streak: streak,
         ['current-date']: currentDateLocal,
         habitId: habitId,
         lastClickedMs: utcDateMs
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
         ['current-date']: currentDateLocal,
         habitId: habitId,
         lastClickedMs: utcDateMs - 86400000
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